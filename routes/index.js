const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

require('../models/article');
const Article = mongoose.model('article');

router.get('/', (req, res) => {
  Article.find({})
    .then(article => {
      res.render('home', {
        article: article
      });
    });
});
  
module.exports = router;