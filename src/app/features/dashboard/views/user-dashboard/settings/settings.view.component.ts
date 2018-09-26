import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PasswordSettingsViewComponent } from './components/password-settings/password-settings.view.component';
import { ChangeEmailViewComponent } from './components/change-email/change-email.view.component';
import { ManageSessionsViewComponent } from './components/manage-sessions/manage-sessions.view.component';
import { MsisdnSettingsViewComponent } from './components/msisdn-settings/msisdn-settings.view.component';
import { Store, select } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { GetSessionWithAccount } from '@anymind-ng/api';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'plat-settings',
  templateUrl: './settings.view.component.html',
  styleUrls: ['./settings.view.component.sass'],
})
export class SettingsViewComponent implements OnInit {
  public session$: Observable<GetSessionWithAccount>;

  constructor(private ngbModalService: NgbModal, private store: Store<fromCore.IState>) {}

  public ngOnInit(): void {
    this.session$ = this.store.pipe(
      select(fromCore.getSession),
      filter(session => typeof session !== 'undefined'),
    ) as Observable<GetSessionWithAccount>;
  }

  public openChangeNumberModal = (): void => {
    this.ngbModalService.open(MsisdnSettingsViewComponent);
  };

  public openChangePasswordModal = (): void => {
    this.ngbModalService.open(PasswordSettingsViewComponent);
  };

  public openChangeEmailModal = (): void => {
    this.ngbModalService.open(ChangeEmailViewComponent);
  };

  public openManageSessionsModal = (): void => {
    this.ngbModalService.open(ManageSessionsViewComponent);
  };
}
