const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

// TODO: Explore email templates in React.js with mjms
const createEmail = text => `
    <div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: san-serif;
        line-hight: 2;
        font-size: 20px;
    ">
    <h2>Hello!</h2>
    <p>${text}</p>
    </div>
`;

exports.transport = transport;
exports.createEmail = createEmail;
