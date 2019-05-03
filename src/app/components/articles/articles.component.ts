import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ArticleService } from '@service/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [ArticleService]
})
export class ArticlesComponent implements OnInit {
  articles: Array<object>;

  constructor(
    private artService: ArticleService,
    private store: Store<({ userAuth })>,
  ) { }

  ngOnInit() {
    this.store.select('userAuth').subscribe(user => {
      this.artService.getArticles(user.id).subscribe((data: {articles}) => {
        this.articles = data.articles;
      });
    });
  }

}
