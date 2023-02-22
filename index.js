const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 8000;

var corsOptions = {
  origin: "https://solvethesudoku.vercel.app",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://solvethesudoku.vercel.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Home endpoint is Working!! (get)");
});

app.post("/solve", (req, res) => {
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

app.listen(port, () => console.log(`server listening on PORT ${port}`));
