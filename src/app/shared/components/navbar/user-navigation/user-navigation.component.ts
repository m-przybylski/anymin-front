// tslint:disable:no-object-literal-type-assertion
import {
  AfterViewChecked,
  Component, ElementRef, Input, OnInit, ViewChildren, QueryList, OnDestroy
} from '@angular/core';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Subject } from 'rxjs';
import { GetProfileWithDocuments, GetSession } from '@anymind-ng/api';
import { UserNavigationComponentService } from './user-navigation.component.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'plat-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.sass']
})

export class UserNavigationComponent implements OnInit, OnDestroy, AfterViewChecked {

  @Input()
  public isExpertNavVisible: boolean;

  @Input()
  public isCompany: boolean;

  @Input()
  public isExpert: boolean;

  public currentElement$ = new Subject<ElementRef>();

  public companyName: string;
  public companyLogo: string;
  public expertAvatar: string;
  public expertName: string;
  public clientName: string;
  private ngUnsubscribe$ = new Subject<void>();
  private readonly activeElementClassName = 'active';
  private logger: LoggerService;
  @ViewChildren('listElement') private listOfNavbarElements: QueryList<ElementRef>;

  constructor(private navbarComponentService: UserNavigationComponentService,
              private userSessionService: UserSessionService,
              private alertService: AlertService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('UserNavigationComponent');
  }

  public ngAfterViewChecked(): void {
    const activeElement = this.listOfNavbarElements.filter(element =>
      element.nativeElement && element.nativeElement.className === this.activeElementClassName);
    if (activeElement[0]) {
      this.currentElement$.next(activeElement[0]);
    }
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public ngOnInit(): void {
    this.userSessionService.getSession().then((session) => {
      if (session.account !== undefined) {
        this.isCompany = session.account.isCompany;
        this.isExpert = session.account.isExpert;
      }

      this.assignClientNavigationDetails(session);

      if (this.isCompany || this.isExpert) {
        this.assignProfileDetails(session);
      }
    }, (err) => this.handleNavbarComponentServiceError(err, 'Can not get session'));

    this.navbarComponentService.onUpdateUserProfile()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.navbarComponentService.updateSession()
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe(session => this.assignProfileDetails(session));
      }, (err) => this.handleNavbarComponentServiceError(err, 'Can not subscribe isExpertProfileCreated$ event'));

    this.navbarComponentService.onUpdateClientProfile$()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.navbarComponentService.updateSession()
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe(session => {
            this.assignClientNavigationDetails(session);
          }, (err) => this.handleNavbarComponentServiceError(err, 'Can not update session when updating profile'));
      }, (err) => this.handleNavbarComponentServiceError(err, 'Can not subscribe on update profile'));
  }

  private assignProfileDetails = (session: GetSession): void => {
    this.navbarComponentService.getProfileDetails(session)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(profileDetails => {
        if (session.account !== undefined) {
          this.isCompany = session.account.isCompany;
          this.isExpert = session.account.isExpert;
        }
        this.assignUserNavigationDetails(profileDetails);
      }, (err) => this.handleNavbarComponentServiceError(err, 'Can not get profileDetails'));
  }

  private assignClientNavigationDetails = (session: GetSession): void => {
    if (session.account !== undefined && typeof session.account.settings.nickname !== 'undefined') {
      this.clientName = session.account.settings.nickname;
    }
    if (session.account !== undefined && typeof session.account.settings.avatar !== 'undefined') {
      this.expertAvatar = session.account.settings.avatar;
    }
  }

  private assignUserNavigationDetails = (profileDetails: GetProfileWithDocuments): void => {
    if (this.isExpert && profileDetails.profile.expertDetails !== undefined) {
      this.expertAvatar = profileDetails.profile.expertDetails.avatar;
      this.expertName = profileDetails.profile.expertDetails.name;
    }

    if (this.isCompany && profileDetails.profile.organizationDetails !== undefined) {
      this.companyName = profileDetails.profile.organizationDetails.name;
      this.companyLogo = profileDetails.profile.organizationDetails.logo;
    }
  }

  private handleNavbarComponentServiceError = (err: HttpErrorResponse, msg: string): void => {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.warn(msg, (err));
  }
}
