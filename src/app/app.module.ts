import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { AlertModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';


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

import { HttpService } from './http.service';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ValidationFormComponent } from './forms/validation-form/validation-form.component';
import { LogoutComponent } from './logout/logout.component';
import { ArticleItemComponent } from './articles/article-item/article-item.component';
import { ArticlesComponent } from './articles/articles.component';

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
    ArticlesComponent
  ],
  imports: [
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
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
