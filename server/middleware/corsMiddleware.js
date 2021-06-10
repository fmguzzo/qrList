const express = require("express");
const cors = require("cors");
const app = express();

const whitelist = [
  "http://localhost:5000",
  "https://localhost:5443",
  "http://localhost:3000",
];
var corsOptionsDelegate = (req, callback) => {
  var corsOptions;
  console.log(req.header("Authorization"));
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

exports.cors = cors(); //no option - Reply allowOrigin '*'
exports.corsWithOptions = cors(corsOptionsDelegate); //option - Reply allowOrigin by function
