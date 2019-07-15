import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserProfile } from '../models/userProfile.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  userProfile: UserProfile;
  profileArray: any[];


  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.getUserProfile();
  }

  private getUserProfile() {
    this.auth.getUserProfile().subscribe(
      data => { console.log('success', data);
                this.userProfile = data;
                this.profileArray = this._makeProfileArray(this.userProfile);
                // this.auth.setUserProfile(this.userProfile);
     },
      error => {
        if (error.status === 403) {
        alert('No tiene permisos para acceder a esta página');
        this.router.navigate(['']);
      } else {
        alert('Error desconocido');
      }

      });
  }


  /* private getUserProfile() {
    this.userProfile = this.auth.getUserProfile();
    this.profileArray = this._makeProfileArray(this.userProfile);
  }
 */

  private _makeProfileArray(obj) {
    const keyPropArray = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        keyPropArray.push(key + ': ' + obj[key]);
      }
    }
    console.log(keyPropArray);
    return keyPropArray;
  }
}
