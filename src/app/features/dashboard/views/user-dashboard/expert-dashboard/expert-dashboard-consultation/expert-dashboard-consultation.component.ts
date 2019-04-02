import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { EmploymentWithService, ExpertPresenceStatus, GetCreditCard, GetDefaultPaymentMethod } from '@anymind-ng/api';
import { RouterHelpers, RouterPaths } from '@platform/shared/routes/routes';
import { Subject } from 'rxjs';
import { ExpertAvailabilityService } from '@platform/features/dashboard/components/expert-availability/expert-availablity.service';
import { ExpertDashboardConsultationComponentService } from '@platform/features/dashboard/views/user-dashboard/expert-dashboard/expert-dashboard-consultation/expert-dashboard-consultation-component.service';

export interface IPaymentMethod {
  defaultPaymentMethod: GetDefaultPaymentMethod;
  getCreditCard: ReadonlyArray<GetCreditCard>;
}

@Component({
  selector: 'plat-expert-dashboard-consultations',
  templateUrl: './expert-dashboard-consultation.component.html',
  styleUrls: ['./expert-dashboard-consultation.component.sass'],
  providers: [ExpertDashboardConsultationComponentService],
})
export class ExpertDashboardConsultationsComponent implements OnInit {
  @Input()
  public consultations: ReadonlyArray<EmploymentWithService>;

  @Input()
  public isOwnProfile: boolean;

  @Input()
  public isCompany: boolean;

  @Input()
  public isLogged: boolean;

  @Input()
  public expertId: string;

  @Input()
  public expertAccountId: string;

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

  public isExpertAvailable: boolean;
  public companyProfileUrl: string;
  public paymentMethod = new Subject<IPaymentMethod>();

  constructor(
    private expertDashboardConsultationServiceComponent: ExpertDashboardConsultationComponentService,
    private availability: ExpertAvailabilityService,
  ) {}

  public ngOnInit(): void {
    this.expertDashboardConsultationServiceComponent.getPaymentMethod().subscribe(paymentMethod => {
      this.paymentMethod.next(paymentMethod);
    });
    this.availability.getExpertPresence(this.expertId).subscribe(availability => {
      this.isExpertAvailable = availability === ExpertPresenceStatus.StatusEnum.Available;
    });
  }

  public add = (): void => {
    this.addConsultation.emit();
  };

  public onOpenConsultationDetails = (serviceId: string): void => {
    this.openConsultationDetails.emit(serviceId);
  };
}
