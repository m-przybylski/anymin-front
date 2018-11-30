import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProfileModalComponent } from '@platform/shared/components/modals/profile/create-profile/create-profile.component';
import { CreateOrganizationModalComponent } from '@platform/shared/components/modals/profile/create-organization/create-organization.component';

@Component({
  selector: 'plat-welcome',
  templateUrl: './welcome.view.component.html',
  styleUrls: ['./welcome.view.component.sass'],
})
export class WelcomeViewComponent {
  constructor(private modalService: NgbModal) {}

  public onCreateExpertAccount(): void {
    this.modalService.open(CreateProfileModalComponent);
  }

  public onCreateCompanyAccount(): void {
    this.modalService.open(CreateOrganizationModalComponent);
  }
}
