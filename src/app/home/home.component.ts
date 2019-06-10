import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';
import { DialogService } from '../dialog/dialog.service';
import { ExampleComponent } from '../example/example.component';
import { SampleComponent } from '../sample/sample.component';
import { PercentPipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService, private modal: ModalService, private dialog: DialogService ) {}

  ngOnInit() {
     // this.initModal();
     console.log(window.screen.width);
  }

  initModal() {

    // this.cargarModal();

    /* const inputs = {
      isMobile: false,
      padre: 'Pepe',
      madre: 'Isa'
    };

    const output = {
      terminado: true
    }; */

   // this.modal.init(SampleComponent, inputs, output);

  }

  cargarModal() {
    const ref = this.dialog.open(ExampleComponent, { data: { message: 'I am a dynamic component inside of a dialog!' },
    width: '30' });

    ref.afterClosed.subscribe(result => {
      console.log('Dialog closed', result);
    });
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
  }
}
