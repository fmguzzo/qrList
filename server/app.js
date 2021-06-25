var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var passport = require("passport");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/userRoutes");
import sitesRouter from "./routes/siteRoutes";
import itemsRouter from "./routes/itemRoutes";
import listsRouter from "./routes/listRoutes";

import { notFound, errorHandler } from "./middleware/errorMiddleware";
import connectDB from "./db";

//Connnect to DB
connectDB();

var app = express();

/**
 *  Secure traffic only - Redirect to secure port
 */

app.all("*", (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
    res.redirect(
      307,
      "https://" + req.hostname + ":" + app.get("secPort") + req.url
    );
  }
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, "public")));
//app.use(express.static(path.join(__dirname, '../client/build')));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/sites", sitesRouter);
app.use("/api/lists", listsRouter);
app.use("/api/items", itemsRouter);
//app.use("/api/orders", ordersRouter);

/**
 *  Error Handler
 */

app.use(notFound);
app.use(errorHandler);

module.exports = app;
