import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { ArticleService } from '@service/article.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {

  editForm = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    description: ['', Validators.required],
    date: ['']
  });

  constructor(private fb: FormBuilder, private router: Router, private artService: ArticleService) { }

  editArticle() {
    const { id, title, description } = this.editForm.value;
    console.log(title, description, this.editForm.value);
    this.artService.editArticle(id, title, description).subscribe(res => console.log(res));
  }

  ngOnInit() {
    console.log('edit');
    // let articleId = this.router.url.split('/').slice(2,3).join('/');

    // this.artService.getArticle(articleId).subscribe(
    //   ({article}) => {
    //     this.editForm.patchValue({
    //       id: article._id,
    //       title: article.title,
    //       description: article.description,
    //       date: article.date
    //     })
    //   }
    // );
  }

}
