// tslint:disable:no-empty
import { Subject, ReplaySubject } from 'rxjs';

export class ModalAnimationComponentService {
  private isPending$ = new Subject<boolean>();
  private isChanged$ = new Subject<boolean>();
  private height$ = new ReplaySubject<string>(1);

  constructor() {}

  public onModalContentChange = (): Subject<boolean> => this.isChanged$;

  public isPendingRequest = (): Subject<boolean> => this.isPending$;

  public getPreviousHeight$ = (): ReplaySubject<string> => this.height$;
}
