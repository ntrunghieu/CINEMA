import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private user: any = null;

  login(userData: any) {
    localStorage.setItem('user', JSON.stringify(userData));
    this.user = userData;
  }

  logout() {
    localStorage.removeItem('user');
    this.user = null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
