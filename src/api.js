const express = require("express");
const axios = require("axios").default;
require("dotenv").config();
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const cors = require("cors");
app.use(cors());

const corsOptions = {
  // needed. for get request, this is all we need
  origin: "https://sudoku-solver-frontend.vercel.app/",
};

app.get("/", (req, res) => {
  res.json({
    hello: "hi!",
  });
});

app.options("/solve", cors(corsOptions)); // helps with post requests

app.post("/solve", cors(corsOptions), (req, res) => {
  const options = {
    method: "POST",
    url: "https://solve-sudoku.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "solve-sudoku.p.rapidapi.com",
    },
    data: {
      puzzle: req.body.numbers,
    },
  };
  axios
    .request(options)
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

// router.get("/test", (req, res) => {
//   res.json({
//     hello: "test!",
//   });
// });

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
