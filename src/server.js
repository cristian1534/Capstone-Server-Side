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
app.get("/", (req, res) => {
  try {
    res.send(`
    <html>
      <head>
        <title>CAPSTONE PROJECT</title>
        <style>
          body {
            background-color: black;
            font-family: Arial, sans-serif;
          }
          h1 {
            color: yellow;
            text-align: center;
            margin-top: 25rem;
          }
        </style>
      </head>
      <body>
        <h1>CAPSTONE PROJECT - SERVER RUNNING.</h1>
      </body>
    </html>
  `);
  } catch (err) {
    return res.sendStatus(500);
  }
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

database();

module.exports = app;
