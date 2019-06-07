import { Observable, Subject } from 'rxjs';

export class DialogRef {
  constructor() {}

  close(result?: any) {
    this._afterClosed.next(result);
  }

  // tslint:disable-next-line:member-ordering
  private readonly _afterClosed = new Subject<any>();

  // tslint:disable-next-line:member-ordering
  afterClosed: Observable<any> = this._afterClosed.asObservable();
}
