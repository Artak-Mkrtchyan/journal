import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { LogoutComponent } from '../logout/logout.component';
import { RegistrationComponent } from '../registration/registration.component';

import { ArticleComponent } from '../articles/article/article.component';
import { ArticleEditComponent } from '../articles/article-edit/article-edit.component';
import { ArticleAddComponent } from '../articles/article-add/article-add.component';


const artileRoutes = [
  { path: 'add', component: ArticleAddComponent },
  {
    path: ':id',
    pathMath: 'prefix',
    children: [
      { path: '',  component: ArticleComponent },
      { path: 'edit', component: ArticleEditComponent },
    ]
  },
];

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/registration', component: RegistrationComponent },
  { path: 'user/logout', component: LogoutComponent },

  { path: 'articles', children: artileRoutes },
];
