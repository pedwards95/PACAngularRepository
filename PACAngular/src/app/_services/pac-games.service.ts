import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { User, Game, Review } from '../models';
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

  addReview(review) : Observable<Review>
  {
    // let review = new Review
    // {
    //   review.ReviewId = 0,
    //   review.UserId = UserId,
    //   review.Username = Username,
    //   review.GameId = GameId,
    //   review.GameName = GameName,
    //   review.Rating = Rating,
    //   review.ReviewBody = ReviewBody
    // }
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
