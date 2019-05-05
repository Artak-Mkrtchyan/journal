import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ArticleService } from '@service/article.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  articles;
  loading = true;

  color = 'primary';
  mode = 'indeterminate';
  value = 100;

  add() {
    this.router.navigate(['articles/add']);
  }

  constructor(
    private router: Router,
    private store: Store<({ userAuth })>,
    private artService: ArticleService
  ) { }

  ngOnInit() {
    this.artService.getMyArticles().subscribe((data: {article}) => {
      this.articles = data.article;
      this.loading = false;
    });
  }

}
