import { ReplaySubject } from 'rxjs/ReplaySubject';

export class ContentHeightAnimationService {

  private height$ = new ReplaySubject<string>(1);

  constructor() {
  }

  public getPreviousHeight$ = (): ReplaySubject<string> =>
    this.height$

}
