import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private CurrentUserSubject: BehaviorSubject<User>;
    public CurrentUser: Observable<User>;
    private baseUrl = environment.gameHubApiBaseUrl;

    constructor(private http: HttpClient) {
        this.CurrentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('CurrentUser')));
        this.CurrentUser = this.CurrentUserSubject.asObservable();
    }

    public get CurrentUserValue(): User {
        return this.CurrentUserSubject.value;
    }

    login(username, password) {
        return this.http.post<any>(`${this.baseUrl}api/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('CurrentUser', JSON.stringify(user));
                this.CurrentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('CurrentUser');
        this.CurrentUserSubject.next(null);
    }
}