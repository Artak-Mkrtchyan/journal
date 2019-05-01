import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ArticleService } from '@service/article.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {
  formData = false;
  editForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private artService: ArticleService) { }

  editArticle() {
    const { id, title, description } = this.editForm.value;
    this.artService.editArticle(id, title, description).subscribe(res => console.log(res));
  }

  ngOnInit() {
    const articleId = this.router.url.split('/').slice(2, 3).join('/');

    this.artService.getArticle(articleId).subscribe(
      ({article}: any) => {
        const { _id: id, title, description, date } = article;

        this.editForm = this.fb.group({
          id: [id],
          title: [title, Validators.required],
          description: [description, Validators.required],
          date: [date]
        });
        this.formData = true;
      });
  }

}
