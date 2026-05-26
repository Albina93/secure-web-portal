const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiration = "2h";

function signToken(user) {
  const payload = { id: user._id, email: user.email };
  return jwt.sign(payload, secret, { expiresIn: expiration });
}

module.exports = { signToken };
