import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IInvitationList } from '../../services/invitation-list.resolver.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: 'invitations-list.component.html',
  styleUrls: ['invitations-list.component.sass'],
})
export class InvitationsListComponent implements OnDestroy {
  public invitations: ReadonlyArray<IInvitationList>;

  private ngUnsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute) {
    this.route.data
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(({ data }: { data: ReadonlyArray<IInvitationList> }) => {
        this.invitations = data || [];
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
