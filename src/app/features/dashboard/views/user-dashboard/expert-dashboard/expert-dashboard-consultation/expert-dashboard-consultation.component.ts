import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmploymentWithService } from '@anymind-ng/api';
import { RouterHelpers, RouterPaths } from '@platform/shared/routes/routes';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { Router } from '@angular/router';
import * as fromCore from '@platform/core/reducers';
import { Store } from '@ngrx/store';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { NavbarActions } from '@platform/core/actions';

@Component({
  selector: 'plat-expert-dashboard-consultations',
  templateUrl: './expert-dashboard-consultation.component.html',
  styleUrls: ['./expert-dashboard-consultation.component.sass'],
})
export class ExpertDashboardConsultationsComponent extends Logger {
  @Input()
  public consultations: ReadonlyArray<EmploymentWithService>;

  @Input()
  public isOwnProfile: boolean;

  @Input()
  public expertId: boolean;

  @Input()
  public isCompany: boolean;

  @Input()
  public isLogged: boolean;

  @Input()
  public set accountId(value: string) {
    this.companyProfileUrl = `/${RouterHelpers.replaceParams(RouterPaths.dashboard.company.profile.asPath, {
      [RouterPaths.dashboard.company.profile.params.profileId]: value,
    })}`;
  }

  @Output()
  public addConsultation = new EventEmitter<void>();

  @Output()
  public openConsultationDetails = new EventEmitter<string>();

  public companyProfileUrl: string;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private store: Store<fromCore.IState>,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ExpertDashboardConsultationsComponent'));
  }

  public add = (): void => {
    this.addConsultation.emit();
  };

  public onOpenConsultationDetails = (serviceId: string): void => {
    this.openConsultationDetails.emit(serviceId);
  };

  public onAlertInformationLinkClick = (): void => {
    void this.router.navigate([this.companyProfileUrl]).then(isRedirectSuccessful => {
      if (!isRedirectSuccessful) {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        this.loggerService.warn('Can not redirect to dashboard/user/discover');
      }
    });
    this.store.dispatch(new NavbarActions.SetUserType(UserTypeEnum.COMPANY));
  };
}
