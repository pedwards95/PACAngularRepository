import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameHubComponent } from './game-hub/game-hub.component';
import { LoginComponent } from './login/login.component';
import { LinkComponent } from './link/link.component';
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './register/register.component';
import { ReviewDetailComponent } from './review-detail/review-detail.component'
import { UserDetailComponent } from './user-detail/user-detail.component'
import { HangmanComponent } from './hangman/hangman.component';
import { AuthGuard } from './authentification';

const routes: Routes = [
  { path: '', component: GameHubComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'Hangman', component: HangmanComponent, canActivate: [AuthGuard]},
  { path: 'reviewdetail/:id', component: ReviewDetailComponent, canActivate: [AuthGuard]},
  { path: 'users/profile/:id', component: UserDetailComponent, canActivate: [AuthGuard]},
  { path: 'link', component: LinkComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
