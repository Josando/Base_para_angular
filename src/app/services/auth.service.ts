import { Injectable, Inject } from '@angular/core';
import { Signup } from '../models/signup.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { Router } from '@angular/router';
import { UserProfile } from '../models/userProfile.model';
import { User } from '../models/user.model';
// import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userProfile: UserProfile;
  private loggedIn = false;
  private user: User;

  constructor(private router: Router, private http: HttpClient, @Inject('API_BASE_URL') private baseUrl: string) { }

  signupUser(user: Signup) {

    return this.http.post(this.baseUrl + 'api/account', user)
      .subscribe(
        data => this.router.navigate(['/login'])
      );
  }

  loginUser(user: Login) {
    return this.http.post(this.baseUrl + 'api/auth/login', user)
      .subscribe(data => {
        console.log(data, ' this is what we got form server...');
      });
  }

  login(user: Login) {
    return this.http.post<Login>(this.baseUrl + 'api/auth/login', user)
      .subscribe(
        data => {
          this.setSession(data);
          this.loggedIn = true;
          this.router.navigate(['/profile']);
        }
      );
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('id_token');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('expires_at');
  }

  getUserProfile(): Observable<UserProfile> {
    const authToken = localStorage.getItem('auth_token');
    return this.http.get<UserProfile>(this.baseUrl + 'api/profile', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + authToken })
      });
  }

  /* setUserProfile(userProfile: UserProfile) {
    this.userProfile = userProfile;
  } */

  /* getUserProfile() {
    const authToken = localStorage.getItem('auth_token');

    if (this.userProfile == null) {
      this.http.get<UserProfile>(this.baseUrl + 'api/profile', { headers: new HttpHeaders({ Authorization: 'Bearer ' + authToken }) })
        .subscribe(data => {
          this.userProfile = data;
          console.log(this.userProfile);
        });
    }
    return this.userProfile;
  } */

  isLoggedIn() {

    return this.loggedIn;
  }

  getUser() {

    return this.user;
  }

  private setSession(authResult) {
    const expiresAt = authResult.expires_in * 1000 + Date.now();
    this.user = authResult;
    localStorage.setItem('id_token', authResult.id);
    localStorage.setItem('auth_token', authResult.auth_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }
}


