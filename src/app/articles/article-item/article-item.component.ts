import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ArticlesService } from '../articles.service';

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
    this.router.navigate(['articles', this.article._id ])
  }

  delete(id: string) {
    console.log(id);
  }

  constructor(private artService: ArticlesService, private router: Router) { }

  ngOnInit() {
    console.log(this.article);
    // this.link = `articles/${this.article._id}/edit`;
  }

}
