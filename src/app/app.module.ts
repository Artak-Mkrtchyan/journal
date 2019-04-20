import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AlertModule } from 'ngx-bootstrap';

import { StoreModule, Store, select } from '@ngrx/store';



import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';


import { userAuth } from './store';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,

  MatCardModule,
  MatButtonModule
} from '@angular/material';

import { UserService } from '@service/user.service';
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
      maxAge: 25, // Retains last 25 states
      // logOnly: environment.production, // Restrict extension to log-only mode
    }),


    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // AlertModule.forRoot(),
    MatButtonModule,
    MatGridListModule,
    FlexLayoutModule,

    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,

    MatListModule,

    MatSidenavModule,
    MatIconModule,
    MatCardModule

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
