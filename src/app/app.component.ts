import { Component } from '@angular/core';
import { ModalService } from './services/modal.service';
// import { DialogService } from './dialog/dialog.service';
import { ExampleComponent } from './example/example.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NetCore21';

  constructor(private modal: ModalService) {

   /*  const ref = this.dialog.open(ExampleComponent, { data: { message: 'I am a dynamic component inside of a dialog!' } });

    ref.afterClosed.subscribe(result => {
      console.log('Dialog closed', result);
    }); */
  }

  removeModal() {
    this.modal.destroy();
  }

}






