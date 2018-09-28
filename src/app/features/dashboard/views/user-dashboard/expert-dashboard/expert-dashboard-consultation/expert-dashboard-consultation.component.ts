import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmploymentWithService } from '@anymind-ng/api';

@Component({
  selector: 'plat-expert-dashboard-consultations',
  templateUrl: './expert-dashboard-consultation.component.html',
  styleUrls: ['./expert-dashboard-consultation.component.sass'],
})
export class ExpertDashboardConsultationsComponent {
  @Input()
  public consultations: ReadonlyArray<EmploymentWithService>;

  @Input()
  public isOwnProfile: boolean;

  @Input()
  public expertId: boolean;

  @Output()
  public addConsultation = new EventEmitter<void>();

  @Output()
  public openConsultationDetails = new EventEmitter<string>();

  public add = (): void => {
    this.addConsultation.emit();
  };

  public onOpenConsultationDetails = (serviceId: string): void => {
    this.openConsultationDetails.emit(serviceId);
  };
}
