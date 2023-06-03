const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
require("dotenv").config();

chai.use(chaiHttp);

describe("Testing connection to MongoDB", () => {
  it("Should GET connection to DB", (done) => {
    const isProduction = process.env.NODE_ENV === "production";
    const MONGODB_URI = isProduction
      ? process.env.MONGO_URI_PROD
      : process.env.MONGO_URI_DEV;
    mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        mongoose.connection.readyState ? done() : console.log("DB Connection Test Failed");
      })
      .catch((error) => {
        done(error);
      });
  });
});
