import { Component, OnInit, Input, Output, inject, ComponentRef } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {

  @Input() isMobile: boolean;
  @Output() terminado: boolean;

  constructor(private modal: ModalService) { }

  ngOnInit() {
  }

  public close() {
    this.terminado = false;
    console.log(this.terminado);
    this.modal.destroy();
  }

}
