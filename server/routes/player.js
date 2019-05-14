/* globals Buffer */
import { Router } from "express";
import multer from "multer";
import fs from "fs";

var upload = multer({ dest: "uploads/" });

const router = new Router();

router.post("/player", upload.single("file"), (req, res) => {
  var data_url = req.body.fileData;

  var encodedstring = Buffer.from(data_url);
  fs.writeFileSync(`./uploads/tracks/${req.body.fileName}.mp3`, encodedstring);

  res.send({ body: req.body.file });
});

export default router;
