const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiration = "2h";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

function signToken(user) {
  const payload = { id: user._id, email: user.email };
  return jwt.sign(payload, secret, { expiresIn: expiration });
}

module.exports = { signToken, authMiddleware };
