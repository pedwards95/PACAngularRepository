import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import User from './models/user';
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

  createUser(user: User) {
    return this.http.post<User>(`${this.baseUrl}api/users`, user)
      .toPromise();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);
      return of(result as T);
    };
}
}
