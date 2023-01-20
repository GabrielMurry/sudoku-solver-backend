const express = require("express");
const axios = require("axios").default;
// const cors = require("cors");

const serverless = require("serverless-http");

const app = express();
// app.use(cors());

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "hi!",
  });
});

// router.post("/solve", (req, res) => {
//   const options = {
//     method: "POST",
//     url: "https://solve-sudoku.p.rapidapi.com/",
//     headers: {
//       "content-type": "application/json",
//       "X-RapidAPI-Key": process.env.RAPID_API_KEY,
//       "X-RapidAPI-Host": "solve-sudoku.p.rapidapi.com",
//     },
//     data: {
//       puzzle: req.body.numbers,
//     },
//   };
//   axios
//     .request(options)
//     .then((response) => {
//       console.log(response.data);
//       res.json(response.data);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// });

// router.get("/test", (req, res) => {
//   res.json({
//     hello: "test!",
//   });
// });

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);