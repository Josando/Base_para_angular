import {
  Component, Type, OnDestroy, AfterViewInit, ViewChild, ChangeDetectorRef, ComponentFactoryResolver,
  ComponentRef, Renderer2, ElementRef, HostListener
} from '@angular/core';
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
  @ViewChild('dialogs') dialog: ElementRef;
  @ViewChild(InsertionDirective)
  insertionPoint: InsertionDirective;
  moving = false;

  // tslint:disable-next-line:variable-name
  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();
  public width: number;
  public widthpx: number;

  childComponentType: Type<any>;

  shift = {
    x: 0,
    y: 0
  };

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef,
              private dialogRef: DialogRef, private config: DialogConfig, private renderer: Renderer2, private elRef: ElementRef) {
    this.width = config.widthPer;
    this.widthpx = config.widthpx;
    // this.permitircc.
  }

  startMove(e) {
    if (this.config.draggable) {
      const position = this.getPosition(e.currentTarget);
      this.shift = {
        x: e.pageX - position.left,
        y: e.pageY - position.top
      };
      this.moving = true;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  move(event: MouseEvent) {
    if (this.moving) {
      // Here I'm trying to access the parent element to set it's
      // CSS properties. The mouse y position is being logged
      // successfully, but the parent elements style is not being set.
      this.renderer.setStyle(this.dialog.nativeElement, 'top', (event.clientY - this.shift.y) + 'px');
      this.renderer.setStyle(this.dialog.nativeElement, 'left', (event.clientX - this.shift.x) + 'px');
    }
  }

  @HostListener('document:mouseup')
  stopMove() {
    this.moving = false;
  }

  getPosition(elem) {
    const box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }


  ngAfterViewInit() {
    // this.renderer.removeClass(this.dialog.nativeElement, 'dialog');
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  onOverlayClicked(evt: MouseEvent) {
    if (this.config.permitirCerrar) {
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
