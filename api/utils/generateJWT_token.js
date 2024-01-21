// utils/generateJWT_token.js

const jwt = require('jsonwebtoken');

function generateToken(res, userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  // Set the JWT as an HTTP cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none', // Corrected value
    maxAge: 60 * 60 * 1000,
  });
  

  return token;
}

module.exports = generateToken;
