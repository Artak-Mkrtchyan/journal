import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ArticleService } from '@service/article.service';
import { UserService } from '@service/user.service';


import { selectUser } from '../../store/selectors/user.selector';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  articles: Array<object>;

  constructor(
    private artService: ArticleService,
    private store: Store<IAppState>,
    private userService: UserService
  ) {}

  ngOnInit() {
    const IsUserAuth = this.userService.getCurrentAuth();
    this.store.select(selectUser).subscribe(user => {
      this.artService.getArticles(user.id, IsUserAuth).subscribe((data: {articles}) => {
        this.articles = data.articles;
      });
    });
  }
}
