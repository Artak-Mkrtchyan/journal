import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticlesService } from './articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [ArticlesService]
})
export class ArticlesComponent implements OnInit {
  articles: Array<object>;

  add() {
    this.router.navigate(['articles/add']);
  }

  constructor(private artService: ArticlesService, private router: Router) { }

  ngOnInit() {
    this.artService.getArticles().subscribe(data => {
      console.log(data);
      this.articles = data.articles;
    });
  }

}
