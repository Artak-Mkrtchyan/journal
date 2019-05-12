/* globals Buffer, __dirname */
import { Router } from "express";
import multer from "multer";
import fs from "fs";

var upload = multer({ dest: "uploads/" });

const router = new Router();

router.post("/player", upload.single("file"), (req, res) => {
  var data_url = req.body.file;
  // var matches = data_url.match(/^data:.+\/(.+);base64,(.*)$/);
  // var ext = matches[1];
  // var base64_data = matches[2];

  // console.log(ext);
  // fs.createWriteStream(req.file.originalname);

  // var bitmap = fs.readFileSync(data_url);
  var encodedstring = Buffer.from(data_url);
  fs.writeFileSync(__dirname + `1.mp3`, encodedstring);

  // var buffer = new Buffer(data_url, 'base64');

  // fs.writeFileSync(__dirname + `1.mp3`, buffer);
  res.send({ body: req.body.file });
});

export default router;
