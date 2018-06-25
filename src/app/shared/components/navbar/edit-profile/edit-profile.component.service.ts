import { ReplaySubject } from 'rxjs/ReplaySubject';

export class EditProfileModalComponentService {

  private value$ = new ReplaySubject<string>(1);
  private avatarUrl$ = new ReplaySubject<string>(1);

  constructor() {
  }

  public getPreviousValue$ = (): ReplaySubject<string> =>
    this.value$

  public getPreviousAvatarSrc = (): ReplaySubject<string> =>
    this.avatarUrl$

}
