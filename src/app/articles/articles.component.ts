import { Component, OnInit } from '@angular/core';

import { ArticlesService } from './articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [ArticlesService]
})
export class ArticlesComponent implements OnInit {
  articles: Array<object>

  constructor(private artService: ArticlesService) { }

  ngOnInit() {
    this.artService.getArticles().subscribe(data => {
      console.log(data)
      this.articles = data.articles;
    })
  }

}
