import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { User } from '../models/user';
import { PACGamesService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-game-hub',
  templateUrl: './game-hub.component.html',
  styleUrls: ['./game-hub.component.css']
})
export class GameHubComponent implements OnInit
{
  currentUser : User;
  users: User[];
  error: string | undefined;

  createUserForm = this.formBuilder.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      description: ['', Validators.required]
    }
  );
  constructor(
    private authenticationService: AuthenticationService,
    private PACGamesService: PACGamesService,
    private gameHubApi: PACGamesService,
    private formBuilder: FormBuilder
  )
  {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void
  {
    this.getAll()
  }

  getAll()
  {
    this.PACGamesService.getUsers()
      .pipe(first())
      .subscribe(users => this.users = users);
    // return this.gameHubApi.getUsers()
    //   .then(
    //     users =>
    //     {
    //       this.users = users;
    //       this.resetError();
    //     }, // success
    //     error => {
    //       this.handleError(error);
    //     } // error
    //   );
  }

  deleteUser(id: number) {
    this.PACGamesService.delete(id)
        .pipe(first())
        .subscribe(() => this.getAll());
  }

  handleError(error: HttpErrorResponse)
  {
    if (error.error instanceof ErrorEvent)
    {
      this.error = `An error occurred: ${error.error.message}`;
    }
    else
    {
      this.error = `Backend returned code ${error.status}, body was: ${error.error}`
    }
  }

  resetError()
  {
    this.error = undefined;
  }
}
