require('dotenv').config();
const jwt = require('jsonwebtoken');

// Middleware to authenticate requests using JWT token
const authMiddleware = async (req, res, next) => {
  let token;

  if (req.headers.authorization && 
     req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify the token and extract user information
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = decoded;
      next();
    } catch (error) {
      console.error("Error in authMiddleware:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.log("No token provided");
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = authMiddleware;
