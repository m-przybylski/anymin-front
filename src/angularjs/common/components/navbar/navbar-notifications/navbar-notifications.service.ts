import { Subject } from 'rxjs/Subject';

export class NavbarNotificationsService {

  public readonly onInvitationsResolvedSubject = new Subject<void>();

  constructor() {
  }

  public onInvitationsResolved = (onFetchInvitations: () => void): void => {
    this.onInvitationsResolvedSubject.subscribe(onFetchInvitations)
  }

  public resolveInvitations = (): void => {
    this.onInvitationsResolvedSubject.next();
  }
}
