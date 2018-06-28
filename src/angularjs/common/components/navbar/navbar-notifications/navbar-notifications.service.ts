// tslint:disable:no-empty
import { Subject } from 'rxjs';

// tslint:disable:member-ordering
export class NavbarNotificationsService {

  public readonly onInvitationsResolvedSubject = new Subject<void>();

  public static $inject = [];

  constructor() {
  }

  public onInvitationsResolved = (onFetchInvitations: () => void): void => {
    this.onInvitationsResolvedSubject.subscribe(onFetchInvitations);
  }

  public resolveInvitations = (): void => {
    this.onInvitationsResolvedSubject.next();
  }
}
