import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ArticleService } from '@service/article.service';
import { UserService } from '@service/user.service';

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
    private userService: UserService
  ) {}

  ngOnInit() {
    const IsUserAuth = this.userService.getCurrentAuth();
    this.store.select('userAuth').subscribe(user => {
      this.artService.getArticles(user.id, IsUserAuth).subscribe((data: {articles}) => {
        this.articles = data.articles;
      });
    });
  }
}
