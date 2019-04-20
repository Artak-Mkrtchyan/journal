import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { ArticleService } from '@service/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article: object = {
    id: '',
    title: '',
    description: '',
    date: ''
  };

  constructor(private router: Router, private artService: ArticleService) { }

  ngOnInit() {
    console.log(this.router);
    const articleId = this.router.url.split('/').slice(2, 3).join('/');

    this.artService.getArticle(articleId).subscribe(
      ({article}) => {
        this.article = {
          id: article._id,
          title: article.title,
          description: article.description,
          date: article.date
        };
      }
    );
  }

}
