const http = require("http");
const axios = require("axios");

exports.getAll = async (req, res) => {
  try {
    const URL = "http://dev3.dansmultipro.co.id/api/recruitment/positions.json";
    let fetchResult = (await axios.get(URL)).data;
    let responseResult = [];

    const { description, location, full_time, limit, page } = JSON.parse(
      req.query.query
    );

    let searchQuery = {};

    if (description !== "") searchQuery.desc = description;
    if (location !== "") searchQuery.loc = location;
    if (full_time !== "") searchQuery.ft = full_time;

    if (Object.keys(searchQuery).length === 0) {
      return res.status(200).json({
        code: 200,
        statusText: "OK",
        success: true,
        message: "Get all data success",
        result: fetchResult,
      });
    }

    const { desc, loc, ft } = searchQuery;

    for (let i = 0; i < fetchResult.length; i++) {
      const EACH_DATA = fetchResult[i];

      const { type, description, location } = EACH_DATA;

      if (desc && loc && ft === true) {
        const REGEX_DESC = new RegExp(desc, "i");
        const REGEX_LOC = new RegExp(loc, "i");

        if (
          REGEX_DESC.test(description) === true &&
          REGEX_LOC.test(location) === true &&
          type === "Full Time"
        )
          responseResult.push(EACH_DATA);
      }

      if (desc && loc && ft === false) {
        const REGEX_DESC = new RegExp(desc, "i");
        const REGEX_LOC = new RegExp(loc, "i");

        if (
          REGEX_DESC.test(description) === true &&
          REGEX_LOC.test(location) === true &&
          type !== "Full Time"
        )
          responseResult.push(EACH_DATA);
      }

      // desc && ft === true
      if (desc && ft === true) {
        const REGEX_DESC = new RegExp(desc, "i");

        if (REGEX_DESC.test(description) === true && type === "Full Time")
          responseResult.push(EACH_DATA);
      }

      if (desc && ft === false) {
        const REGEX_DESC = new RegExp(desc, "i");

        if (REGEX_DESC.test(description) === true && type !== "Full Time")
          responseResult.push(EACH_DATA);
      }

      if (loc && ft === true) {
        const REGEX_LOC = new RegExp(loc, "i");

        if (REGEX_LOC.test(location) === true && type === "Full Time")
          responseResult.push(EACH_DATA);
      }

      if (loc && ft === false) {
        const REGEX_LOC = new RegExp(loc, "i");

        if (REGEX_LOC.test(location) === true && type !== "Full Time")
          responseResult.push(EACH_DATA);
      }

      if (!desc && !loc && ft === true) {
        if (type === "Full Time") responseResult.push(EACH_DATA);
      }

      if (!desc && !loc && ft === false) {
        if (type !== "Full Time") responseResult.push(EACH_DATA);
      }
    }

    const skip = (+page - 1) * +limit;

    responseResult = responseResult.slice(skip, page * limit);

    return res.status(200).json({
      code: 200,
      statusText: "OK",
      success: true,
      message: "Get all data success",
      total: responseResult.length,
      result: responseResult,
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
