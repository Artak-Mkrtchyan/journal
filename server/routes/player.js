/* globals Buffer */
import { Router } from "express";
import multer from "multer";
import fs from "fs";
import request from "request";

var upload = multer({ dest: "uploads/" });

const router = new Router();

router.post("/player", upload.single("file"), (req, res) => {
  var data_url = req.body.fileData;

  var encodedstring = Buffer.from(data_url);
  fs.writeFileSync(`./uploads/tracks/${req.body.fileName}.mp3`, encodedstring);

  res.send({ body: req.body.file });
});

router.get("/music", (req, response) => {
  request.get(
    "https://api.mixcloud.com/search/?q=eminem&type=cloudcast",
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      console.log(res.body, body.url);
      console.log(body.explanation);
      response.send({ data: res.body });
    }
  );
});

export default router;
