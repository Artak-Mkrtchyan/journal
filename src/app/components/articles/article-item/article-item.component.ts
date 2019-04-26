import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleService } from '@service/article.service';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {
  @Input() article: object = {};
  link: string;

  edit() {
    this.router.navigate(['articles', this.article._id, 'edit' ]);
  }

  show() {
    this.router.navigate(['articles', this.article._id ]);
  }

  delete(id: string) {

  }

  constructor(private artService: ArticleService, private router: Router) { }

  ngOnInit() {
    // this.link = `articles/${this.article._id}/edit`;
  }

}
