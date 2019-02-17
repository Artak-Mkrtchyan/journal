const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

require('../models/article');
const Article = mongoose.model('article');

router.get('/', (req, res) => {
  Article.find()
  // .sort({date:'desc'})
    .then(article => {
      res.render('home', {
        article: article
      });
    });
  
  // res.render('home');
});

router.get('/articles', (req, res) => {
	res.render('articles/index')
});

router.get('/articles/add', (req, res) => {
  res.render('articles/add');
})

router.get('/articles/edit/:id', (req, res) => {
  Article.findOne({
    _id: req.params.id
  })
  .then(article => {
    console.log(article);
    res.render('articles/edit', {
      article: article
    });  
  });
  
  // res.render('articles/edit');
})

router.post('/articles/:id', (req, res) => {
  Article.findOne({
    _id: req.params.id
  })
  .then(article => {
    article.title = req.body.title;
    article.description = req.body.description;

    article.save()
    
    
  });

  res.redirect('/');
})

router.post('/articles/add', (req, res) => {
  console.log(req.body);

  if (!req.body.title) {
    // errors.push({text:'Please add a title'});
  }

  if (!req.body.descroption) {
    // errors.push({text:'Please add some description'});
  }  

  const newArticle = {
    title: req.body.title,
    description: req.body.description
  }
  new Article(newArticle)
    .save()
    .then(article => {
      // req.flash('success_msg', 'Video idea added');
      // res.redirect('/ideas');
    })

  

  res.render('articles/add')
})
  
module.exports = router;