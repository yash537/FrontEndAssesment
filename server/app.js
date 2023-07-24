// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
  const allowedOrigins = ["http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.enable("trust proxy");

app.post("/api/fetchStockData", (req, res) => {
  // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
  // https://api.polygon.io/v1/open-close/AAPL/2023-07-21
  // https://api.polygon.io/v1/open-close/{stocksTicker}/{date}

  const { stockSymbol, date } = req.body;
  console.log(stockSymbol, date);
  const token = "MLbrHkKAClA7yA3I54yCNxwwTvK7GiPg";

  axios
    .get(`https://api.polygon.io/v1/open-close/${stockSymbol}/${date}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      console.log("API response:", response.data);
      return res.status(200).send(response.data);
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
  console.log("hello from api side");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
