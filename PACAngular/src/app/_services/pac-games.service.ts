import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { User, Game, Review, Notice } from '../models';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PACGamesService
{
  private baseUrl = environment.gameHubApiBaseUrl;

  get defaultUserId() { return 0; }

  constructor(private http: HttpClient) { }

  httpOptions =
  {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
  };

  getUsers() : Observable<User[]>
  {
    return this.http.get<User[]>(`${this.baseUrl}api/users`)
      .pipe(
        catchError(this.handleError<User[]>(`getUsers`,[]))
      );
  }

  getUser(id : number) : Observable<User>
  {
    return this.http.get<User>(`${this.baseUrl}api/users/${id}`)
      .pipe(
        catchError(this.handleError<User>(`getUser`))
      );
  }

  updateUser(user: User): Observable<any>
  {
    return this.http.put(`${this.baseUrl}api/users${user.UserId}`, user, this.httpOptions).pipe(
      catchError(this.handleError<Review>('updateUser'))
    );
  }

  getGames() : Observable<Game[]>
  {
    return this.http.get<Game[]>(`${this.baseUrl}api/games`)
      .pipe(
        catchError(this.handleError<Game[]>(`getGames`,[]))
      );
  }

  getReview(id : number) : Observable<Review>
  {
    return this.http.get<Review>(`${this.baseUrl}api/reviews/${id}`)
      .pipe(
        catchError(this.handleError<Review>(`getReview`))
      );
  }

  getReviews() : Observable<Review[]>
  {
    return this.http.get<Review[]>(`${this.baseUrl}api/reviews`)
      .pipe(
        catchError(this.handleError<Review[]>(`getReviews`))
      );
  }

  updateReview(review: Review): Observable<any>
  {
    return this.http.put(`${this.baseUrl}api/reviews/${review.ReviewId}`, review, this.httpOptions).pipe(
      catchError(this.handleError<Review>('updateReview'))
    );
  }

  addReview(review) : Observable<Review>
  {
    return this.http.post<Review>(`${this.baseUrl}api/reviews`, review, this.httpOptions)
      .pipe(
        catchError(this.handleError<Review>(`addReview`))
      );
  }

  deleteReview(review : Review) : Observable<Review>
  {
    return this.http.delete<Review>(`${this.baseUrl}api/reviews/${review.ReviewId}`)
      .pipe(
        catchError(this.handleError<Review>(`deleteReview`,review))
      );
  }

  createUser(user: User) {
    return this.http.post<User>(`${this.baseUrl}api/users`, user)
      .pipe(
        catchError(this.handleError<User[]>(`createUser`,[]))
      );;
  }

  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<User[]>(`${this.baseUrl}api/users?search=${term}`).pipe(
      catchError(this.handleError<User[]>('searchUsers', []))
    );
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

  getNotices() : Observable<Notice[]>
  {
    return this.http.get<Notice[]>(`${this.baseUrl}api/notices`)
      .pipe(
        catchError(this.handleError<Notice[]>(`getNotices`))
      );
  }

  addNotice(notice) : Observable<Notice>
  {
    return this.http.post<Notice>(`${this.baseUrl}api/notices`, notice, this.httpOptions)
      .pipe(
        catchError(this.handleError<Notice>(`addNotice`))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);
      return of(result as T);
    };
}
}
