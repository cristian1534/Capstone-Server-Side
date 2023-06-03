
const mongoose = require("mongoose");
const color = require("colors");
require("dotenv").config();


const isProduction = process.env.NODE_ENV === "production";
const MONGODB_URI = isProduction
  ? process.env.MONGO_URI_PROD
  : process.env.MONGO_URI_DEV;
const database = async (req, res) => {
  try {
    const conn = await mongoose.connect(
      MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => {
        if (isProduction)
          console.log(color.underline.red(`Connected to MONGO: ${process.env.NODE_ENV}`))
      })
      .catch(err => console.log(`Error to Connect MONGO: ${err.message}`))
  } catch (err) {
    console.log(`Error: ${err.message}`)
    process.exit(1)
  }
}

module.exports = database;
