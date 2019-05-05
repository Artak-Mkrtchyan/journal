import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { SnackBarService } from '@service/snackBar.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: SnackBarService
  ) { }

  getArticles(id: string, isUserAuth: boolean) {
    if (isUserAuth) {
      return this.http.post('/api/articles', {id});
    } else {
      return this.http.get('/api/articles');
    }
  }

  getMyArticles() {
    return this.http.get('/api/articles/user');
  }

  getArticle(id: string) {
    return this.http.get(`api/articles/${id}`);
  }

  editArticle(id: string, title: string, description: string) {
    return this.http.post(`api/articles/${id}/edit`, { title, description });
  }

  addArticle(title: string, description: string) {
    return this.http.post(`api/articles/add`, {title, description}).subscribe((res: {msg: string}) => {
        this.snackBar.openSnackBar(res.msg, 'Cancel', 'snackbar-success');
        this.router.navigate(['articles']);
      }
    );
  }

  deleteArticle(id: string) {
    return this.http.post(`api/articles/delete/${id}`, {id}).subscribe((res: {msg: string}) => {
      this.snackBar.openSnackBar(res.msg, 'Cancel', 'snackbar-success');
    });
  }
}
