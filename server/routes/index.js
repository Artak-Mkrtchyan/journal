const express = require('express');
const mongoose = require('mongoose');

const { ensureAuthenticated } = require('../helpers/auth');

const router = express.Router();

require('../models/article');
const Article = mongoose.model('article');

router.post('/', (req, res) => {
  console.log('get');
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
    .then(articles => {
      res.send({
        articles: articles,
        isMyArticles: false
      });
    });
});

module.exports = router;
