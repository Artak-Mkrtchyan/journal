import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {


  constructor(private http: HttpClient, private router: Router) { }

  getArticles() {
    return this.http.get('/api');
  }

  getArticle(id: string) {
    this.router.navigate([`articles/${id}`]);
    return this.http.get(`api/articles/${id}`);
  }

  editArticle(id: string, title: string, description: string) {
    return this.http.post(`api/articles/${id}/edit`, { title, description });
  }

  addArticle(title: string, description: string) {
    return this.http.post(`api/articles/add`, {title, description});
  }
}
