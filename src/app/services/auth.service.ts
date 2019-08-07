import { Injectable, Inject } from '@angular/core';
import { Signup } from '../models/signup.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { Login } from '../models/login.model';
import { Router } from '@angular/router';
import { UserProfile } from '../models/userProfile.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userProfile: UserProfile;
  // private loggedIn = false;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private usersSubject = new BehaviorSubject<User>(null);
  private user: User;
  private usuarioSesion = false;

  get isLoggedInn() {
    if (this.isLoggedIn()) {
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable(); // {2}
  }

  getUsers(): Observable<User> {
    return this.usersSubject.asObservable();
  }

  constructor(private router: Router, private http: HttpClient, @Inject('API_BASE_URL') private baseUrl: string) { }

  signupUser(user: Signup) {

    return this.http.post(this.baseUrl + 'api/accounts', user);
     /*  .subscribe(
        data => this.router.navigate(['/login'])
      ); */
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
          this.loggedIn.next(true);
          this.router.navigate(['/profile']);
        }
      );
  }

  logout() {
    // this.loggedIn = false;
    this.loggedIn.next(false);
    localStorage.removeItem('id_token');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_rol');
    // return this.loggedIn;
    // return this.loggedIn.asObservable();
    this.router.navigate(['']);
  }

  getUserProfile(): Observable<UserProfile> {
    const authToken = localStorage.getItem('auth_token');
    return this.http.get<UserProfile>(this.baseUrl + 'api/profile', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + authToken })
      });
  }

   isLoggedIn() {
    const time = parseInt(localStorage.getItem('expires_at'), 10);
    const dateNow = Date.now();
    console.log(time);
    console.log(dateNow);
    if (time != null) {
      if (dateNow < time) {
        this.getUserIsLogedin();
        // this.loggedIn = true;
        this.usuarioSesion = true;
        this.loggedIn.next(true);
      } else {
        this.logout();
      }
    }

    return this.usuarioSesion;
  }

  getUserIsLogedin() {
    const authToken = localStorage.getItem('auth_token');
    return this.http.get<User>(this.baseUrl + 'api/profile/user', { headers: new HttpHeaders({ Authorization: 'Bearer ' + authToken }) })
        .subscribe(data => {
         this.user = data;
         this.usersSubject.next(this.user);
        });
  }

  getUserRol() {
    const rol = localStorage.getItem('user_rol');

    return rol;
  }

  getUser() {

    this.usersSubject.next(this.user);
    return this.user;
  }

  private setSession(authResult) {
    const expiresAt = authResult.expires_in * 1000 + Date.now();
    this.user = authResult;
    this.usersSubject.next(this.user);
    localStorage.setItem('user_rol', authResult.roles);
    localStorage.setItem('id_token', authResult.id);
    localStorage.setItem('auth_token', authResult.auth_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }
}


