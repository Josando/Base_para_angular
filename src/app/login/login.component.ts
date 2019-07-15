import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login.model';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  myForm: FormGroup;

  constructor(private auth: AuthService, public fb: FormBuilder) {
    this.myForm = fb.group({
      email: ['', [Validators.required,
      // Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
    ]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('[A-Za-z0-9!?-]{6,30}')]]
    });
  }

  ngOnInit() {
  }

  loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const user: Login = new Login();
    user.userName = target.querySelector('#email').value;
    user.password = target.querySelector('#password').value;
    this.auth.login(user);
  }

  saveData() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
    } else {
      alert('FILL ALL FIELDS');
    }
    console.log(this.myForm.value);
  }
}
