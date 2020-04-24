import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { User } from '../models';
import { PACGamesService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit
{
  searching : number = 0;
  currentUser : User;
  users$: Observable<User[]>;
  users: User[];
  error: string | undefined;
  private searchTerms = new Subject<string>();

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
    this.getAll();
    this.users$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.PACGamesService.searchUsers(term)),
    );
  }

  getAll()
  {
    this.searching = 0;
    this.searchTerms = new Subject<string>()
    this.PACGamesService.getUsers()
      .subscribe(users => {this.users = users});
  }

  deleteUser(id: number) {
    this.PACGamesService.delete(id)
        .pipe(first())
        .subscribe(() => this.getAll());
  }

  search(searchUser: string): void {
    this.searching = 1;
    this.users = undefined;
    this.searchTerms.next(searchUser);
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

