const express = require('express');
const mongoose = require('mongoose');

const { ensureAuthenticated } = require('../helpers/auth');

const router = express.Router();

require('../models/article');
const Article = mongoose.model('article');

router.get('/', ensureAuthenticated, (req, res) => {
  Article.find({})
    .then(article => {
      res.render('home', {
        article: article
      });
    });
});
  
module.exports = router;