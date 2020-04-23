import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { User } from '../models';
import { PACGamesService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit
{
  currentUser : User;
  users: User[];
  error: string | undefined;

  createUserForm = this.formBuilder.group(
    {
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      Description: ['', Validators.required]
    });

  constructor(
    private authenticationService: AuthenticationService,
    private PACGamesService: PACGamesService,
    private formBuilder: FormBuilder
  )
  {
    this.currentUser = this.authenticationService.CurrentUserValue;
  }

  ngOnInit(): void
  {
    this.getAll()
  }

  getAll()
  {
    this.PACGamesService.getUsers()
      //.pipe(first())
      .subscribe(users => {this.users = users});
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

