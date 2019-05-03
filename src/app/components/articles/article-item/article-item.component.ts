import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleService } from '@service/article.service';

interface IArticle {
  _id: string;
  title: string;
  description: string;
  date: string;
}

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {
  @Input() article: IArticle;
  link: string;

  edit() {
    this.router.navigate(['articles', this.article._id, 'edit' ]);
  }

  show() {
    this.router.navigate(['articles', this.article._id ]);
  }

  delete() {
    this.artService.deleteArticle(this.article._id);
  }

  constructor(private artService: ArticleService, private router: Router) { }

  ngOnInit() { }

}
