import { Component, Type, OnDestroy, AfterViewInit, ViewChild, ChangeDetectorRef, ComponentFactoryResolver,
  ComponentRef, Renderer2, ElementRef } from '@angular/core';
import { InsertionDirective } from '../directive/insertion.directive';
import { Subject } from 'rxjs';
import { DialogRef } from '../dialog.ref';
import { DialogConfig } from '../dialog.config';
// import { config } from 'e2e/protractor.conf';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  componentRef: ComponentRef<any>;
  // @ViewChild('dialogs') dialog: ElementRef;
  @ViewChild(InsertionDirective)
  insertionPoint: InsertionDirective;

   // tslint:disable-next-line:variable-name
   private readonly _onClose = new Subject<any>();
   public onClose = this._onClose.asObservable();
   public width: number;
   public widthpx: number;

  childComponentType: Type<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef,
              private dialogRef: DialogRef, private config: DialogConfig, private renderer: Renderer2 ) {
                this.width = config.widthPer;
                this.widthpx = config.widthpx;
                // this.permitircc.
            }

  ngAfterViewInit() {
    // this.renderer.removeClass(this.dialog.nativeElement, 'dialog');
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  onOverlayClicked(evt: MouseEvent) {
    if (this.config.permitirCerrar === 1) {
    this.dialogRef.close();
    }
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  close() {
    this._onClose.next();
  }
}
