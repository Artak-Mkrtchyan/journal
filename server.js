/* globals global, __dirname */
import { join } from "path";
import express from "express";
import { json, urlencoded } from "body-parser";
import mongoose from "mongoose";
import { createServer } from "http";
import passport from "passport";
import cors from "cors";

const app = express();

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
  .connect("mongodb://localhost/articles", {
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

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "dist/index.html"));
});

// app.use(cors());

const port = 3000;
app.set("port", port);

const server = createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
