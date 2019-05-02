import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';

import { Observable, config } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  config ={apiUrl:'http://localhost:8080/grillAnywhere/api'};
    constructor(private http: HttpClient) { }

  getCurrentUserDetails(){
    return this.http.get<User>(`${this.config.apiUrl}/user/me`)
    .pipe(map(response => response));
  }

    // getAll() {
    //     return this.http.get<User[]>(`${this.config.apiUrl}/users`);
    // }

    // getById(id: number) {
    //     return this.http.get(`${this.config.apiUrl}/users/${id}`);
    // }

    register(user) {
        return this.http.post(`${this.config.apiUrl}/auth/signup`, user);
    }

    // update(user: User) {
    //     return this.http.put(`${this.config.apiUrl}/users/${user.id}`, user);
    // }

    // delete(id: number) {
    //     return this.http.delete(`${this.config.apiUrl}/users/${id}`);
    // }
}
