require('dotenv').config({ path: 'variables.env' });
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());

// decode JWT to get userID for each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // add userId to req for future use
    req.userId = userId;
  }
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  data => {
    console.log(`Server running on port http:/localhost:${data.port}`);
  }
);
