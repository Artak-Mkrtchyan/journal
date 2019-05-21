import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import {
  StoreRouterConnectingModule,
  NavigationActionTiming
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from '@store/reducers/app.reducers';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material-module';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor } from '@helpers/jwt.inspector';

import { AppComponent } from './app.component';
import { HeaderComponent } from '@components/header/header.component';
import { HomeComponent } from '@components/home/home.component';
import { LoginComponent } from '@components/user/login/login.component';
import { RegistrationComponent } from '@components/user/registration/registration.component';
import { ArticleItemComponent } from '@components/articles/article-item/article-item.component';
import { ArticlesComponent } from '@components/articles/articles.component';
import { ArticleEditComponent } from '@components/articles/article-edit/article-edit.component';
import { ArticleComponent } from '@components/articles/article/article.component';
import { ArticleAddComponent } from '@components/articles/article-add/article-add.component';
import { UserProfileComponent } from '@components/user/user-profile/user-profile.component';
import { MusicComponent } from '@components/music/music/music.component';
import { PlayerComponent } from '@components/music/player/player.component';
import { MusicUploadComponent } from '@components/music/music-upload/music-upload.component';
import { SearchComponent } from '@components/music/napster/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ArticleItemComponent,
    ArticlesComponent,
    ArticleEditComponent,
    ArticleComponent,
    ArticleAddComponent,
    UserProfileComponent,
    MusicComponent,
    PlayerComponent,
    SearchComponent,
    MusicUploadComponent
  ],
  imports: [
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    StoreRouterConnectingModule.forRoot({
      navigationActionTiming: NavigationActionTiming.PostActivation
    }),

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
