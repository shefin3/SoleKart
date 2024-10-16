const { error } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// create db connection >>
// we can also create a separate file for this and then import /use that file here

mongoose
  .connect(
    "mongodb+srv://shefiniqbal1998:<Sh@8075407704>@cluster0.e7fj4.mongodb.net/"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({}));
