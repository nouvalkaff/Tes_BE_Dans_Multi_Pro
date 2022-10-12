const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const USERNAME_EXIST = await User.findOne({
      where: { username },
    });

    if (!USERNAME_EXIST) {
      res.status(404).json({
        code: 404,
        statustext: "Not Found",
        success: false,
        message: "Username does not exist, please try again.",
      });
    }

    if (USERNAME_EXIST) {
      const VERIFY_PASS = await bcrypt.compare(
        String(password),
        USERNAME_EXIST.password
      );

      if (!VERIFY_PASS) {
        return res.status(401).json({
          Code: 401,
          StatusText: "Unauthorized",
          Success: false,
          Message: "Wrong password, please try again.",
        });
      }

      const token = jwt.sign(
        {
          user_id: USERNAME_EXIST.dataValues.id,
          status: "Registered user",
          username: USERNAME_EXIST.dataValues.username,
        },
        process.env.SECRET_KEY,
        { expiresIn: "3h" }
      );

      const TOKEN = {
        statusCode: 200,
        statusText: "Success",
        message: "Login Success!",
        token,
      };

      return res.json(TOKEN);
    }
  } catch (error) {
    console.error(error);
  }
};
