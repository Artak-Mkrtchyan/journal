/* globals Buffer, __dirname */
import { Router } from "express";
import multer from "multer";
import fs from "fs";
import request from "request";

var upload = multer({ dest: "uploads/" });

const router = new Router();

router.post("/player", upload.single("file"), (req, res) => {
  var data_url = req.body.fileData;

  var encodedstring = Buffer.from(data_url);
  fs.writeFileSync(
    __dirname + `/uploads/tracks/${req.body.fileName}.mp3`,
    encodedstring
  );

  res.send({ body: req.body.file });
});

router.post("/music", (req, response) => {
  request.get(
    `https://api.mixcloud.com/search/?q=${req.body.searchText}&type=cloudcast`,
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      console.log(res.body, body.url);
      console.log(body.explanation);
      response.send({ songs: res.body });
    }
  );
});

router.get("/music/getToken", (req, response) => {
  request.get(
    `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=2aedc66bb86a1ece60b5cb5658826c35&artist=cher&track=believe&format=json`,
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      console.log(res.body, body.url);
      console.log(body.explanation);
      response.send({ songs: res.body });
    }
  );
});

// http://www.last.fm/api/auth/?api_key=2aedc66bb86a1ece60b5cb5658826c35
export default router;
