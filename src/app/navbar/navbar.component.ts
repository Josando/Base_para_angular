import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogedin$: Observable<boolean>;
  users$: Observable<User>;
  user: User;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.isLogedin$ = this.auth.isLoggedInn;
    this.users$ = this.auth.getUsers();
    this.users$.subscribe(usuario => {
      console.log(usuario);
      });
  }

  logout() {
   this.auth.logout();
  }

}
