import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmploymentWithService } from '@anymind-ng/api';
import { RouterHelpers, RouterPaths } from '@platform/shared/routes/routes';

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
  public isCompany: boolean;

  @Input()
  public isLogged: boolean;

  @Input()
  public set companyId(value: string) {
    this.companyProfileUrl = `/${RouterHelpers.replaceParams(RouterPaths.dashboard.company.profile.asPath, {
      [RouterPaths.dashboard.company.profile.params.profileId]: value,
    })}`;
  }

  @Output()
  public addConsultation = new EventEmitter<void>();

  @Output()
  public openConsultationDetails = new EventEmitter<string>();

  public companyProfileUrl: string;

  public add = (): void => {
    this.addConsultation.emit();
  };

  public onOpenConsultationDetails = (serviceId: string): void => {
    this.openConsultationDetails.emit(serviceId);
  };
}
