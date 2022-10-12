const { Op } = require("sequelize");
const { User } = require("../models");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const { password, username } = req.body;

    const USERNAME_EXIST = await User.findOne({
      where: { username },
    });

    if (USERNAME_EXIST) {
      return res.status(400).json({
        code: 400,
        statustext: "Bad Request",
        success: false,
        message:
          "Please choose another username. This username is already exist in database",
      });
    }

    await User.create({
      ...req.body,
      password: bcrypt.hashSync(String(password), 12),
    });

    const SAVED_DATA = await User.findOne({
      where: { username },
      attributes: {
        exclude: ["password"],
      },
    });

    return res.status(201).json({
      code: 201,
      statusText: "Created",
      success: true,
      message: "Successfully created user: " + SAVED_DATA.username,
      result: SAVED_DATA,
    });
  } catch (error) {
    console.error(error);
  }
};
