import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ArticleService } from '@service/article.service';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.scss']
})
export class ArticleAddComponent implements OnInit {

  addForm = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    description: ['', Validators.required],
    date: ['']
  });

  constructor(private artService: ArticleService, private fb: FormBuilder) { }

  ngOnInit() {}

  addArticle() {
    const { title, description } = this.addForm.value;
    this.artService.addArticle(title, description);
  }

}
