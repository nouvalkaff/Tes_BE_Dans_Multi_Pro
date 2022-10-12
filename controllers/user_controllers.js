const { Op } = require("sequelize");
const { User } = require("../models");
const bcrypt = require("bcrypt");

exports.updateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const id = req.params.id;

    const USER_EXIST = await User.findOne({
      where: { id },
    });

    if (!USER_EXIST) {
      return res.status(404).json({
        code: 404,
        statustext: "Not Found",
        success: false,
        message: "User data is not found in database",
      });
    }

    const USERNAME_EXIST = await User.findOne({
      where: { username },
    });

    if (USERNAME_EXIST) {
      return res.status(409).json({
        code: 409,
        statustext: "Conflict",
        success: false,
        message:
          "Username already exist in database, please change to another username",
      });
    }

    let queryUpdate = {};

    if (username) queryUpdate.username = username;
    if (password) queryUpdate.password = bcrypt.hashSync(String(password), 12);

    const UPDATE_DATA = await User.update(queryUpdate, { where: { id } });

    if (UPDATE_DATA) {
      const USER = await User.findOne({
        where: { id },
        attributes: { exclude: "password" },
      });

      return res.status(200).json({
        code: 200,
        statusText: "OK",
        success: true,
        message: "Get a data success",
        result: USER,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      statusText: "Internal Server Error",
      success: false,
      message: "Cannot get data",
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const USER = await User.findOne({
      where: { id },
      attributes: { exclude: "password" },
    });

    if (!USER) {
      return res.status(404).json({
        code: 404,
        statustext: "Not Found",
        success: false,
        message: "User data is not found in database",
      });
    }

    return res.status(200).json({
      code: 200,
      statusText: "OK",
      success: true,
      message: "Get a data success",
      result: USER,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      statusText: "Internal Server Error",
      success: false,
      message: "Cannot get data",
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const ALL_USERS = await User.findAll({
      attributes: { exclude: "password" },
    });

    return res.status(200).json({
      code: 200,
      statusText: "OK",
      success: true,
      message: "Get all data success",
      result: ALL_USERS,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      statusText: "Internal Server Error",
      success: false,
      message: "Cannot get data",
    });
  }
};

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
      username: String(username),
      password: bcrypt.hashSync(String(password), 12),
    });

    const SAVED_DATA = await User.findOne({
      where: { username },
      attributes: {
        exclude: "password",
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
    return res.status(500).send({
      code: 500,
      statusText: "Internal Server Error",
      success: false,
      message: "Cannot get data",
    });
  }
};
