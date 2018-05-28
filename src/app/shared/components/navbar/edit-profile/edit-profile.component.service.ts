import { ReplaySubject } from 'rxjs/ReplaySubject';

export class ModalComponentEditProfileService {

  private value$ = new ReplaySubject<string>(1);

  constructor() {
  }

  public getPreviousValue$ = (): ReplaySubject<string> =>
    this.value$

}
