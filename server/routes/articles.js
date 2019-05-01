const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();

const { ensureAuthenticated } = require('../helpers/auth');

require('../models/article');
require('../models/user');

const User = mongoose.model('users');
const Article = mongoose.model('article');

router.get('/', (req, res) => {
  let userArtcle = [];
  User.findOne({ _id: req.user._id })
    .then(user => {
      Object.keys(user.articlesList).map(key =>
        Article.findOne({ _id: key })
          .then(article => {
            userArtcle.push(article);
          }));
    })
    .then(() => {
      res.render('articles/main', {
        article: userArtcle,
        isMyArticles: true
      });
    });
});

router.get('/:id/read', (req, res) => {
  Article.findOne({
    _id: req.params.id
  })
  .then(article => {
    res.render('articles/read', {
      id: article.id,
      title: article.title,
      description: article.description
    });
  });
})

router.get('/:id', (req, res) => {
  Article.findOne({
    _id: req.params.id
  })
  .then(article => {
    return res.send({ article });
  });
});

router.post('/:id/edit', (req, res) => {
  Article.findOne({
    _id: req.params.id
  })
  .then(article => {
      article.title = req.body.title;
      article.description = req.body.description;

      article.save();
      res.send({msg: 'Article edited'});
  });

});

router.post('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Article.deleteOne({ _id: req.body.id })
  .then(() => {
    User.findOne({ _id: req.user._id })
      .then(user => {
        let artId = req.body.id;
        const { [artId]: key, ...newList } = user.articlesList;
        user.articlesList = newList;
        user.save();
      });
      res.send({msg: 'Article deleted'});
  });
});

router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  const newArticle = {
    title: req.body.title,
    description: req.body.description,
    userId: req.user._id
  }

  new Article(newArticle)
    .save()
    .then(article => {
      User.findOne({ _id: req.user._id })
      .then(user => {
        let id = article._id;
        let articleId = { [id]: id };
        user.articlesList = { ...user.articlesList, ...articleId };
        user.save();
      });
      res.send({ msg: 'Article saved' });
    });
});

module.exports = router;
