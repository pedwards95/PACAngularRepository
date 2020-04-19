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
  users: User[] = [];
  error: string | undefined;

  createUserForm = this.formBuilder.group(
    {
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      Description: ['', Validators.required]
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
    return this.gameHubApi.getUsers()
      .then(
        users =>
        {
          this.users = users;
          this.resetError();
        }, // success
        error => {
          this.handleError(error);
        } // error
      );
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
      UserId: this.gameHubApi.defaultUserId,
      PictureId: 1,
      FirstName: this.createUserForm.get('FirstName')?.value,
      LastName: this.createUserForm.get('LastName')?.value,
      Username: this.createUserForm.get('Username')?.value,
      Password: this.createUserForm.get('Password')?.value,
      Description: this.createUserForm.get('Description')?.value,
      Admin: false
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
