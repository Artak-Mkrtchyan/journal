const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const { ensureAuthenticated } = require('../helpers/auth');

require('../models/article');
require('../models/user');

const User = mongoose.model('users');
const Article = mongoose.model('article');

router.get('/', (req, res) => {
  let userArtcle = [];
  console.log(req, arguments)
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

// router.get('/read/:id', ensureAuthenticated, (req, res) => {
//   Article.findOne({
//     _id: req.params.id
//   })
//   .then(article => {
//     res.render('articles/read', {
//       id: article.id,
//       title: article.title,
//       description: article.description
//     });
//   });
// })

router.get('/:id', (req, res) => {
  console.log(req.params)
  Article.findOne({
    _id: req.params.id
  })
  .then(article => {
    return res.send({ article });
  });
});

router.post('/:id/edit', (req, res) => {
  // let errors = [];
  //
  // if (!req.body.title) {
  //   errors.push({text:'Please add a title'});
  // }
  //
  // if (!req.body.description) {
  //   errors.push({text:'Please add some description'});
  // }

  Article.findOne({
    _id: req.params.id
  })
  .then(article => {
    // if (errors.length > 0) {
    //   res.render(`articles/edit`, {
    //     errors: errors,
    //     id: req.params.id,
    //     title: req.body.title,
    //     description: req.body.description
    //   })
    // } else {
      article.title = req.body.title;
      article.description = req.body.description;

      article.save();
      res.send({msg: 'ok'});
    // }
  });

});

// router.get('/delete/:id', ensureAuthenticated, (req, res) => {
//   Article.deleteOne({ _id: req.params.id })
//   .then(() => {

//     User.findOne({ _id: req.user._id })
//       .then(user => {
//         let artId = req.params.id;
//         const { [artId]: key, ...newList } = user.articlesList;
//         user.articlesList = newList;
//         user.save();
//       })

//     req.flash('success_msg', 'Article removed');
//     res.redirect('/');
//   });
// });

router.post('/add', (req, res) => {
  // let errors = [];
  //
  // if (!req.body.title) {
  //   errors.push({text:'Please add a title'});
  // }
  //
  // if (!req.body.description) {
  //   errors.push({text:'Please add some description'});
  // }

  // if (errors.length > 0) {
  //   res.render('articles/add', {
  //     errors: errors,
  //     title: req.body.title,
  //     description: req.body.description
  //   })
  // } else {
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
      req.flash('success_msg', 'Article Added')
      res.redirect('/')
    });
  // }
});

module.exports = router;
