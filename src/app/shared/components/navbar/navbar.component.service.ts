import { Subject } from 'rxjs/Rx';

export class NavbarComponentService {
  private isExpertSession$ = new Subject<boolean>();

  public getExpertSessionStatus$ = (): Subject<boolean> =>
    this.isExpertSession$
}
