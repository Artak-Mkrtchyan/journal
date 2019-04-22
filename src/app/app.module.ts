import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AlertModule } from 'ngx-bootstrap';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { userAuth } from './store';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material-module';
import { AppRoutingModule } from './app-routing.module';

import { UserService } from '@service/user.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ValidationFormComponent } from './forms/validation-form/validation-form.component';
import { LogoutComponent } from './logout/logout.component';
import { ArticleItemComponent } from './articles/article-item/article-item.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleEditComponent } from './articles/article-edit/article-edit.component';
import { ArticleComponent } from './articles/article/article.component';
import { ArticleAddComponent } from './articles/article-add/article-add.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ValidationFormComponent,
    LogoutComponent,
    ArticleItemComponent,
    ArticlesComponent,
    ArticleEditComponent,
    ArticleComponent,
    ArticleAddComponent
  ],
  imports: [
    StoreModule.forRoot({ userAuth }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // AlertModule.forRoot(),
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
