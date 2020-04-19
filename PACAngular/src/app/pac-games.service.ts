import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import User from './models/user';


@Injectable({
  providedIn: 'root'
})
export class PACGamesService
{
  private baseUrl = environment.notesApiBaseUrl;
  get defaultUserId() { return 0; }

  constructor(private http: HttpClient) { }

  getUsers()
  {
    return this.http.get<User[]>(`${this.baseUrl}api/users`)
      .toPromise();
  }

  createUser(user: User) {
    return this.http.post<User>(`${this.baseUrl}api/users`, user)
      .toPromise();
  }
}
