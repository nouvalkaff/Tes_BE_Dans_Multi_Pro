const jwt = require("jsonwebtoken"); //import jwt
const { User } = require("../models"); // Import user model
let routes = {};

routes.isUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);

    if (decoded.status !== "Registered user") {
      return res.status(403).json({
        statusText: "Forbidden",
        message: "Sorry, you do not have access, Registered user only!",
      });
    }

    next();
  } catch (err) {
    // If error it will make status code 500 (Internal Server Error) and send the error message
    res.status(500).json({
      statusText: "Internal Server Error",
      message: err,
    });
  }
};

module.exports = routes;
