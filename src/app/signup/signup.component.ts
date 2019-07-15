import { Component, OnInit } from '@angular/core';
import { Signup } from '../models/signup.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  title: any;
  constructor(private auth: AuthService, private router: Router) { }
  ngOnInit() {
  }

  signupUser(event) {
    event.preventDefault();
    const target = event.target;
    const user: Signup = new Signup();
    user.name = target.querySelector('#name').value;
    user.familyName = target.querySelector('#familyName').value;
    user.email = target.querySelector('#email').value;
    user.password = target.querySelector('#password').value;
    user.nickName = target.querySelector('#nickName').value;
    user.location = target.querySelector('#location').value;
    /* this.auth.signupUser(user).subscribe(
      data => { console.log('success', data); },
      error => {
        console.log('oops', error.error);
      }); */
    this.auth.signupUser(user).subscribe(
      data => {this.router.navigate(['/login']);
    },
    error => {
      console.log('Error');
    }
    );
  }
}
