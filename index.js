const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

//Init express
const app = express();

//Set view engine
app.set("view engine", "ejs");

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use("/", require("./routes"));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});

module.exports = app;
