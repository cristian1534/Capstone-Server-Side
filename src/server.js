const express = require("express");
const app = express();
const body_parser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const database = require("./database/database");
const product_routes = require("./routes/product_routes");
const order_routes = require("./routes/order_routes");

const cors_options = {
  origin: "*",
  optionSuccessStatus: 200,
};
const PORT = process.env.PORT || 5000;

app.use(cors(cors_options));
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(morgan("dev"));

app.use("/api", product_routes);
app.use("/api", order_routes);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

database();

module.exports = app;
