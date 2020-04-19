import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { PACGamesService } from '../pac-games.service';
import User from '../models/user';

@Component({
  selector: 'app-game-hub',
  templateUrl: './game-hub.component.html',
  styleUrls: ['./game-hub.component.css']
})
export class GameHubComponent implements OnInit
{
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
    private gameHubApi: PACGamesService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void
  {
    this.getUsers()
  }

  getUsers()
  {
    this.gameHubApi.getUsers()
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

  createUser()
  {
    const newUser: User = {
      userId: this.gameHubApi.defaultUserId,
      pictureId: 1,
      firstName: this.createUserForm.get('firstName')?.value,
      lastName: this.createUserForm.get('lastName')?.value,
      username: this.createUserForm.get('username')?.value,
      password: this.createUserForm.get('password')?.value,
      description: this.createUserForm.get('description')?.value,
      admin: false
    }
    this.gameHubApi.createUser(newUser)
      .then(
        user => {
          if (this.error) {
            this.getUsers();
          } else {
            this.users.unshift(user);
            this.resetError();
          }
        },
        error => this.handleError(error)
      );
  }

}
