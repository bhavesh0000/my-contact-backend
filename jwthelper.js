const jwt = require("jsonwebtoken");

// Generate a JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d", // Token expiration time
  });
};

// Verify and decode a JWT token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = { generateToken, verifyToken };
