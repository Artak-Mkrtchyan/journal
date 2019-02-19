const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

require('../models/article');
const Article = mongoose.model('article');

router.get('/', (req, res) => {
	res.render('articles/index')
});

router.get('/edit/:id', (req, res) => {
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
});

router.post('/:id', (req, res) => {
  Article.findOne({
    _id: req.params.id
  })
  .then(article => {
    article.title = req.body.title;
    article.description = req.body.description;

    article.save()
    
    
  });

  res.redirect('/');
});

router.get('/add', (req, res) => {
  res.render('articles/add');
});

router.get('/delete/:id', (req, res) => {
  Article.deleteOne({ _id: req.params.id })
    .then(() => (
      console.log('delete article')
    ))
    
  res.redirect('/')
});

router.post('/', (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({text:'Please add a title'});
  }

  if (!req.body.description) {
    errors.push({text:'Please add some description'});
  }  

  if (errors.length > 0) {
    res.render('articles/add', {
      errors: errors,
      title: req.body.title,
      description: req.body.description
    })
  } else {
    const newArticle = {
      title: req.body.title,
      description: req.body.description
    }
    console.log(req.body);
    new Article(newArticle)
      .save()
      .then(article => {
        // req.flash('success_msg', 'Video idea added');
        // res.redirect('/ideas');
      })
  
    res.redirect('/')
  }
});
  
module.exports = router;