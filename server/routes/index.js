import { Router } from "express";
import { model } from "mongoose";

const router = new Router();

import "../models/article";
const Article = model("article");

// router.get('/', (req, res) => {
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
//     .then(articles => {
//       res.send({
//         articles: articles,
//         isMyArticles: false
//       });
//     });
// });

export default router;
