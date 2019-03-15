const express = require('express');
const mongoose = require('mongoose');

const { ensureAuthenticated } = require('../helpers/auth');

const router = express.Router();

require('../models/article');
const Article = mongoose.model('article');

// router.get('/', ensureAuthenticated, (req, res) => {
//   Article.find({})
//     .then(article => {
//       let articlesArr = [];
//       Object.values(article).filter(article => {
//         if (`${article.userId}` !== `${req.user._id}`) {
//           articlesArr.push(article);
//         }
//       });
//       return articlesArr;
//     })
//     .then(article => {
//       res.render('home', {
//         article: article,
//         isMyArticles: false
//       });
//     });
// });

router.get('/', (req, res) => {
      res.send('home');
    });


module.exports = router;