// tslint:disable:no-empty
import { ReplaySubject } from 'rxjs';

export class ContentHeightAnimationService {

  private height$ = new ReplaySubject<string>(1);

  constructor() {
  }

  public getPreviousHeight$ = (): ReplaySubject<string> =>
    this.height$

}
