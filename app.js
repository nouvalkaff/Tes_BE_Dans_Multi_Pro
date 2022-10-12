try {
  // Declare variable to use Express function
  const Express = require("express");

  // Declare other essential packages
  const Cors = require("cors");
  const { Sequelize } = require("sequelize");

  // Requiring "dotenv" config to allow access to .env file
  require("dotenv").config();

  // Declare app variable to allow in creating other essential functions
  const app = Express();

  /**
   * Enable CORS
   * Cross-Origin Resource Sharing (CORS) is
   * an HTTP-header based mechanism that allows a server
   * to indicate any origins (domain, scheme, or port)
   * other than its own from which a browser should permit loading resources.
   */
  app.use(Cors());

  const sequelize = new Sequelize("dansmultipro", "postgres", "12345678", {
    host: "localhost",
    dialect: "postgres",
  });

  // Declare a function to check API is online or offline
  app.all("*", (req, res) =>
    res.send("<h1>API is online. Please specify your URL again.</h1>")
  );

  const PORT = process.env.PORT;

  app.listen(PORT, async () => {
    try {
      console.log("Server start on PORT " + PORT);
      await sequelize.authenticate();
      console.log("Connected to DB");
    } catch (error) {
      console.error(error);
    }
  });
} catch (error) {
  console.error("Error message" + error);
  // Returned to stop the app and avoid potential problem(s)
  return;
}
