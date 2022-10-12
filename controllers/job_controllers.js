const http = require("http");

exports.test = async (req, res) => {
  try {
    let fetchResult;

    http
      .get(
        "http://dev3.dansmultipro.co.id/api/recruitment/positions.json",
        (res) => {
          let data = [];

          res.on("data", (chunk) => {
            data.push(chunk);
          });

          res.on("end", () => {
            console.log("Response ended: ");
            const job = JSON.parse(Buffer.concat(data).toString());

            fetchResult = job;
          });
        }
      )
      .on("error", (err) => {
        console.log("Error: ", err.message);
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
