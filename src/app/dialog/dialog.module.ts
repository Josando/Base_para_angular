import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './component/dialog.component';
import { InsertionDirective } from './directive/insertion.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [DialogComponent, InsertionDirective],
  entryComponents: [DialogComponent]
})
export class DialogModule {}
