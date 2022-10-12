const http = require("http");
const axios = require("axios");

exports.getAll = async (req, res) => {
  try {
    const URL = "http://dev3.dansmultipro.co.id/api/recruitment/positions.json";
    let fetchResult = await axios.get(URL);

    fetchResult = fetchResult.data;

    console.log(fetchResult);

    return res.status(200).json({
      code: 200,
      statusText: "OK",
      success: true,
      message: "Get all data success",
      result: fetchResult,
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
