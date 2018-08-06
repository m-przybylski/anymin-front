import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeNumberComponent } from './components/change-number/change-number/change-number.component';
import { PasswordSettingsViewComponent } from './components/password-settings/password-settings.view.component';

@Component({
  selector: 'plat-settings',
  templateUrl: './settings.view.component.html',
  styleUrls: ['./settings.view.component.sass']
})
export class SettingsViewComponent {

  constructor(private ngbModalService: NgbModal) {
  }

  public openChangeNumberModal = (): void => {
    this.ngbModalService.open(ChangeNumberComponent);
  }

  public openChangePasswordModal = (): void => {
    this.ngbModalService.open(PasswordSettingsViewComponent);
  }

}
