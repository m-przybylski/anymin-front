import { Component, Input } from '@angular/core';
import { EmploymentWithService } from '@anymind-ng/api';

@Component({
  selector: 'plat-expert-dashboard-consultations',
  templateUrl: './expert-dashboard-consultation.component.html',
  styleUrls: ['./expert-dashboard-consultation.component.sass'],
})
export class ExpertDashboardConsultationsComponent {
  @Input() public consultations: EmploymentWithService[];
  @Input() public isOwnProfile: boolean;
}
