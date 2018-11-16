const bcrytpt = require('bcryptjs');
const { randomBytes } = require('crypto');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: check if user is authenticated

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );

    return item;
  },

  updateItem(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // find item
    const item = await ctx.db.query.item({ where }, `{ id, title }`);
    //TODO: check if they own it or if admin
    return ctx.db.mutation.deleteItem({ where }, info);
  },

  async signUp(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const password = await bcrytpt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: {
            set: ['USER']
          }
        }
      },
      info
    );
    // create JWT token to sign user in
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // One year cookie
    });
    return user;
  },

  async signIn(parent, { email, password }, ctx, info) {
    // check if user exists
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No user found with email: ${email}`);
    }
    // check if there password is correct
    const isValid = await bcrytpt.compare(password, user.password);
    if (!isValid) {
      throw new Error(`Invalid password`);
    }
    // generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // One year cookie
    });
    // return the user
    return user;
  },
  signOut(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'User signed out successfully' };
  },
  async requestReset(parent, args, ctx, info) {
    // check if user is real
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) {
      throw new Error(`No user found with email: ${args.email}`);
    }
    // set reset token and expiry for that user
    const randomBytesPromisified = promisify(randomBytes);
    const resetToken = (await randomBytesPromisified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // One hour from now
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry }
    });
    console.log(res);
    return { message: 'Password reset successful' };
    // TODO: email user reset token
  },
  async resetPassword(parent, args, ctx, info) {
    // check if the passwords match
    if (args.password !== args.confirmPassword) {
      throw new Error(`Invalid reset - provided passwords do not match`);
    }
    // check reset token and check if token is expired
    const [user] = await ctx.db.query.users({
      where: { resetToken: args.resetToken, resetTokenExpiry_gte: Date.now() - 3600000 }
    });
    if (!user) {
      throw new Error(`Invalid reset - token expired or invalid`);
    }
    // hash new password
    const password = await bcrytpt.hash(args.password, 10);
    // save new password and remove old reset token
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: { password },
      resetToken: null,
      resetTokenExpiry: null
    });
    // generate new JWT
    const token = JWT.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    // set the JWT cookie
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // One year cookie
    });
    // return the new user
    return updatedUser;
  }
};

module.exports = Mutations;
