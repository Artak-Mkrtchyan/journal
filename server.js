/* globals global, __dirname, process */
import { join, resolve } from "path";
import express from "express";
import { json, urlencoded } from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config();

import mainRoute from "./server/routes/index";
import articles from "./server/routes/articles";
import user from "./server/routes/user";
import player from "./server/routes/player";

import passportInit from "./server/config/passport";

passportInit(passport);

app.use(json({ limit: "50mb", extended: true }));
app.use(urlencoded({ extended: false }));

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.PROD_MONGODB, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

app.use(passport.initialize());
app.use(express.static(join(__dirname, "dist")));

app.use("/api", mainRoute);
app.use("/api/articles", articles);
app.use("/api/user", user);
app.use("/api", player);

const allowed = [".js", ".css", ".png", ".jpg"];

app.get("*", (req, res) => {
  if (allowed.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
    res.sendFile(resolve(`dist/${req.url}`));
  } else {
    res.sendFile(join(__dirname, process.env.PATH_HTML));
  }
});

// app.use(cors());

const port = 3000;
const host = "0.0.0.0";

app.set("port", process.env.PORT || port);

app.listen(process.env.PORT || port, host, function() {
  console.log("Server started.......");
});
