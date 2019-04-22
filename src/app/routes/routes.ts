import { Routes } from '@angular/router';

import { HomeComponent } from '@components/home/home.component';
import { LoginComponent } from '@components/login/login.component';
import { LogoutComponent } from '@components/logout/logout.component';
import { RegistrationComponent } from '@components/registration/registration.component';

import { ArticleComponent } from '@components/articles/article/article.component';
import { ArticleEditComponent } from '@components/articles/article-edit/article-edit.component';
import { ArticleAddComponent } from '@components/articles/article-add/article-add.component';

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
