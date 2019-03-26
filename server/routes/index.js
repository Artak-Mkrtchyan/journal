const express = require('express');
const mongoose = require('mongoose');

const { ensureAuthenticated } = require('../helpers/auth');

const router = express.Router();

require('../models/article');
const Article = mongoose.model('article');

router.get('/s', (req, res) => {
  Article.find({})
    .then(article => {
      // console.log(req);
      let articlesArr = [];
      Object.values(article).filter(article => {
        // if (`${article.userId}` !== `${req.user._id}`) {
          articlesArr.push(article);
        // }
      });
      return articlesArr;
    })
    .then(article => {
      res.json({
        article: article,
        isMyArticles: false
      });
    });

  // res.json({test: 'work'});
});

module.exports = router;
