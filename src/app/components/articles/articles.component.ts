import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleService } from '@service/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [ArticleService]
})
export class ArticlesComponent implements OnInit {
  articles: Array<object>;

  add() {
    this.router.navigate(['articles/add']);
  }

  constructor(private artService: ArticleService, private router: Router) { }

  ngOnInit() {
    this.artService.getArticles().subscribe(data => {
      console.log(data);
      this.articles = data.articles;
    });
  }

}
