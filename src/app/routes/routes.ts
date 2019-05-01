import { Routes } from '@angular/router';

import { HomeComponent } from '@components/home/home.component';
import { LoginComponent } from '@components/user/login/login.component';
import { RegistrationComponent } from '@components/user/registration/registration.component';
import { UserProfileComponent } from './../components/user/user-profile/user-profile.component';

import { ArticleComponent } from '@components/articles/article/article.component';
import { ArticleEditComponent } from '@components/articles/article-edit/article-edit.component';
import { ArticleAddComponent } from '@components/articles/article-add/article-add.component';

import { AuthGuard } from '../guards/auth.guard';
import { ActiveUserGuard } from '../guards/active-user.guard';

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

const userRoutes = [
  { path: 'login', component: LoginComponent, canActivate: [ActiveUserGuard] },
  { path: 'registration', component: RegistrationComponent, canActivate: [ActiveUserGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] }
];

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'user', children: userRoutes },
  { path: 'articles', children: artileRoutes },
];
