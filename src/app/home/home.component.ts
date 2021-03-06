import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DialogService } from '../dialog/service/dialog.service';
import { ExampleComponent } from '../example/example.component';
import { PercentPipe } from '@angular/common';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  text = 'Angular 5\nfoo';
  enabled = true;
  isLogedin: boolean;

  constructor(private auth: AuthService, private dialog: DialogService ) {}

  ngOnInit() {
    // this.isLoggedIn();
    console.log(window.screen.width);
  }

  cargarModal() {
    const ref = this.dialog.open(ExampleComponent, { data: { message: 'I am a dynamic component inside of a dialog!' },
    widthPer: '', widthpx: '', draggable: true ,  permitirCerrar: true
     });

    ref.afterClosed.subscribe(result => {
      console.log('Dialog closed', result);
    });
  }

  /* isLoggedIn() {
    this.isLogedin = this.auth.isLoggedIn();
  }

  logout() {
    this.isLogedin = this.auth.logout();

  } */
}
