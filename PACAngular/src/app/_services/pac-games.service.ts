import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { User, Game } from '../models';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PACGamesService
{
  private baseUrl = environment.gameHubApiBaseUrl;

  get defaultUserId() { return 0; }

  constructor(private http: HttpClient) { }

  getUsers() : Observable<User[]>
  {
    return this.http.get<User[]>(`${this.baseUrl}api/users`)
      .pipe(
        catchError(this.handleError<User[]>(`getUsers`,[]))
      );
  }

  getGames() : Observable<Game[]>
  {
    return this.http.get<Game[]>(`${this.baseUrl}api/games`)
      .pipe(
        catchError(this.handleError<Game[]>(`getGames`,[]))
      );
  }

  createUser(user: User) {
    return this.http.post<User>(`${this.baseUrl}api/users`, user)
      .pipe(
        catchError(this.handleError<User[]>(`createUser`,[]))
      );;
  }

  register(user: User) {
    return this.http.post(`${this.baseUrl}api/users`, user)
      .pipe(
        catchError(this.handleError<User[]>(`register`,[]))
      );
  }

  delete(id: number) {
      return this.http.delete(`${this.baseUrl}api/users/${id}`)
        .pipe(
          catchError(this.handleError<User[]>(`delete`,[]))
        );;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);
      return of(result as T);
    };
}
}
