import { Component } from '@angular/core';
import { Config } from '../../../../../../../../config';

@Component({
  selector: 'plat-consultation-footer-organization',
  templateUrl: 'consultation-footer-organization.component.html',
  styleUrls: ['consultation-footer-organization.component.sass'],
})
export class ConsultationFooterOrganizationTextComponent {
  public zendeskLink = Config.links.zendeskAboutConsultation;
}
