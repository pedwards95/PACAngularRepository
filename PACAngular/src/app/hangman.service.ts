import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Observable, of } from 'rxjs';
import { GameData } from './models';

@Injectable({
  providedIn: 'root'
})
export class HangmanService {

  private baseUrl = environment.gameHubApiBaseUrl;

  constructor(private http: HttpClient) { }

  //get array of gamedata for questions and answers to be passed to hangman component
  getQA() : Observable<GameData[]>{
    return this.http.get<GameData[]>(`${this.baseUrl}api/gamedata`)
      .pipe(
        catchError(this.handleError<GameData[]>(`getQA`,[]))
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
