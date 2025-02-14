const jwt = require("jsonwebtoken");
const { v7: uuidv7 } = require("uuid");

const TokenService = {
  generateAccessToken: (id, email) => {
    const expiresIn = process.env.ACCESS_TOKEN_MAX_AGE ? parseInt(process.env.ACCESS_TOKEN_MAX_AGE) : 1800;

    return jwt.sign(
      {
        id,
        email,
        uniqeu: uuidv7(),
        exp: Math.floor(Date.now() / 1000) + expiresIn,
      },
      process.env.ACCESS_TOKEN_SECRET
    );
  },
  generateRefreshToken: (id, email) => {
    return jwt.sign(
      {
        id,
        email,
        uniqeu: uuidv7(),
      },
      process.env.REFRESH_TOKEN_SECRET
    );
  },
  verifyToken: (token, secret) => jwt.verify(token, secret),
};

module.exports = TokenService;
