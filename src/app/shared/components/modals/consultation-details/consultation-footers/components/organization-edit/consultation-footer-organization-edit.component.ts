import { Component, Input } from '@angular/core';

@Component({
  selector: 'plat-consultation-footer-organization-edit-freelance',
  templateUrl: 'consultation-footer-organization-edit.component.html',
  styleUrls: ['consultation-footer-organization-edit.component.sass'],
})
export class ConsultationFooterOrganizationEditTextComponent {
  @Input()
  public organizationPrice: string;
  @Input()
  public grossPrice: string;
  @Input()
  public expertPrice: string;
}
