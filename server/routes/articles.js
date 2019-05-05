import { Router } from 'express';
import { model } from 'mongoose';
import passport from 'passport';

const router = new Router();

import '../models/article';
import '../models/user';

const User = model('users');
const Article = model('article');

router.get('/', (req, res) => {
  Article.find({})
    .then(article => {
      let articlesArr = [];
      Object.values(article).filter(article => {
        articlesArr.push(article);
      });
      return articlesArr;
    })
    .then(articles => {
      res.send({
        articles: articles
      });
    });
});

router.post('/', (req, res) => {
  Article.find({})
    .then(article => {
      let articlesArr = [];
      Object.values(article).filter(article => {
        if (`${article.userId}` !== `${req.body.id}`) {
          articlesArr.push(article);
        }
      });
      return articlesArr;
    })
    .then(articles => {
      res.send({
        articles: articles
      });
    });
});

router.get('/user', passport.authenticate('jwt', { session: false }), (req, res) => {
  Article.find({ _id: { $in: Object.keys(req.user.articlesList)} })
    .then(article => {
      res.send({
        article: article
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
});

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
  };

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

export default router;
