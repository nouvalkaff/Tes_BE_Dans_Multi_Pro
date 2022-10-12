try {
  // Declare variable to use Express function
  const Express = require("express");

  // Declare other essential packages
  const Cors = require("cors");
  const { Sequelize } = require("sequelize");

  // Requiring "dotenv" config to allow access to .env file
  require("dotenv").config();

  // Declare app variable to allow in creating other essential functions
  const PORT = process.env.PORT;
  const app = Express();

  app.use(Express.json());
  app.use(Express.urlencoded({ extended: false }));

  /**
   * Enable CORS
   * Cross-Origin Resource Sharing (CORS) is
   * an HTTP-header based mechanism that allows a server
   * to indicate any origins (domain, scheme, or port)
   * other than its own from which a browser should permit loading resources.
   */
  app.use(Cors({ origin: "*" }));

  const userRoute = require("./routes/users_routers");
  const loginRoute = require("./routes/login_routers");
  const jobRoute = require("./routes/job_routers");

  app.use("/api/dmp/user", userRoute);
  app.use("/api/dmp/login", loginRoute);
  app.use("/api/dmp/job", jobRoute);

  const sequelize = new Sequelize(
    "dmordzjy",
    "dmordzjy",
    "U7ls8bzkxxEqnJSKYKca59E4-RSQ0cZv",
    {
      host: "rosie.db.elephantsql.com",
      dialect: "postgres",
    }
  );

  // Declare a function to check API is online or offline
  app.all("*", (req, res) => {
    return res.status(200).send({
      code: 200,
      statustext: "OK",
      success: true,
      message:
        "Welcome to API test for PT Dans Multi Pro by Mohamad Nouval Abdel Alkaf",
    });
  });

  // Listening port to start the server and connect to database
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
