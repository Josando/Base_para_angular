import { Observable, Subject } from 'rxjs';

export class ModalRef {
  constructor() {}

  // tslint:disable-next-line:variable-name
  private readonly _afterClosed = new Subject<any>();
  afterClosed: Observable<any> = this._afterClosed.asObservable();

  close(result?: any) {
    this._afterClosed.next(result);
  }
}
