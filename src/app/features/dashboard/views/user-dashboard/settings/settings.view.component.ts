import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PasswordSettingsViewComponent } from './components/password-settings/password-settings.view.component';
import { ChangeEmailViewComponent } from './components/change-email/change-email.view.component';
import { ManageSessionsViewComponent } from './components/manage-sessions/manage-sessions.view.component';
import { MsisdnSettingsViewComponent } from './components/msisdn-settings/msisdn-settings.view.component';

@Component({
  selector: 'plat-settings',
  templateUrl: './settings.view.component.html',
  styleUrls: ['./settings.view.component.sass'],
})
export class SettingsViewComponent {
  constructor(private ngbModalService: NgbModal) {}

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
