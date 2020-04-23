import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameHubComponent } from './game-hub/game-hub.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HangmanComponent } from './hangman/hangman.component';
import { UsersComponent } from './users/users.component';
import { ScoresComponent } from './scores/scores.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { NoticesComponent } from './notices/notices.component';
import { GamesOverviewComponent } from './games-overview/games-overview.component';
import { AlertComponent } from './alert/alert.component';
import { JwtInterceptor, ErrorInterceptor } from './authentification';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LinkComponent } from './link/link.component';

@NgModule({
  declarations: [
    AppComponent,
    GameHubComponent,
    NavbarComponent,
    HangmanComponent,
    UsersComponent,
    ScoresComponent,
    UserDetailComponent,
    ReviewsComponent,
    ReviewDetailComponent,
    NoticesComponent,
    GamesOverviewComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    LinkComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
