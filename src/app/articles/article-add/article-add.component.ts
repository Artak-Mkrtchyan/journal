import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ArticlesService } from '../articles.service';

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
  })

  constructor(private artService: ArticlesService,private fb: FormBuilder) { }

  ngOnInit() {}

  addArticle(title: string, description: string) {
    this.artService.addArticle(title, description).subscribe(
      data => console.log(data)
    );
  }

}
