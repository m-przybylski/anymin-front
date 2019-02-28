import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GetExpertVisibility, GetProfileWithDocuments, GetSessionWithAccount } from '@anymind-ng/api';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import * as fromCore from '@platform/core/reducers';
import * as fromRoot from '@platform/reducers';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject, forkJoin } from 'rxjs';
import { NavbarActions } from '@platform/core/actions';
import { NavbarComponentService } from './navbar.component.service';
import { INavigationItem } from '@platform/features/dashboard/components/navbar/navigation';
import { VisibilityUiActions } from '@platform/features/dashboard/actions';
import * as fromDashboard from '@platform/features/dashboard/reducers';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { RouterPaths } from '@platform/shared/routes/routes';

interface INavbarData {
  expertProfileData?: GetProfileWithDocuments;
  organizationProfileData?: GetProfileWithDocuments;
  getSession: GetSessionWithAccount;
  getUserType: UserTypeEnum;
}

@Component({
  selector: 'plat-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  providers: [NavbarComponentService],
})
export class NavbarComponent extends Logger implements OnInit, OnDestroy {
  @Input()
  public isUserLoggedIn: boolean;

  public navigationItems: ReadonlyArray<INavigationItem>;
  public userAvatarToken: string;
  public userName: string;
  public switchAccountAvatarToken: string;
  public userType: UserTypeEnum;
  public switchAccountType?: UserTypeEnum;
  public expertProfileId?: string;
  public organizationProfileId?: string;
  public isUserMenuVisible$ = this.store.pipe(select(fromCore.getIsNavbarUserMenuVisible));
  public isHelpMenuVisible$ = this.store.pipe(select(fromCore.getIsNavbarHelpMenuVisible));
  public isUserVisible$ = this.store.pipe(
    select(fromDashboard.getVisibilityStatus),
    map(visibility => visibility === GetExpertVisibility.VisibilityEnum.Visible),
  );

  private onDestroyed$ = new Subject<void>();

  constructor(
    private store: Store<fromRoot.IState>,
    private navbarComponentService: NavbarComponentService,
    private router: Router,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('NavbarComponentService'));
  }

  public ngOnInit(): void {
    this.store
      .pipe(
        select(fromCore.getSessionAndUserType),
        filter(({ getSession }) => typeof getSession !== 'undefined'),
        switchMap(({ getSession, getUserType }: { getSession: GetSessionWithAccount; getUserType: UserTypeEnum }) =>
          forkJoin([
            getSession.session.expertProfileId
              ? this.navbarComponentService
                  .getProfileData(getSession.session.expertProfileId)
                  .pipe(catchError(err => this.handleError(err)))
              : of(undefined),
            getSession.session.organizationProfileId
              ? this.navbarComponentService
                  .getProfileData(getSession.session.organizationProfileId)
                  .pipe(catchError(err => this.handleError(err)))
              : of(undefined),
          ]).pipe(
            map(([expertProfileData, organizationProfileData]) => ({
              expertProfileData,
              organizationProfileData,
              getSession,
              getUserType,
            })),
          ),
        ),
        takeUntil(this.onDestroyed$),
      )
      .subscribe(navbarData => this.assignValues(navbarData));
  }

  public ngOnDestroy(): void {
    this.onDestroyed$.next();
    this.onDestroyed$.complete();
  }

  public navigateUserToActivitiesList(): void {
    switch (this.userType) {
      case UserTypeEnum.COMPANY:
        this.router.navigate([RouterPaths.dashboard.company.activities.asPath]);
        break;
      case UserTypeEnum.EXPERT:
        this.router.navigate([RouterPaths.dashboard.user.activities.expert.asPath]);
        break;
      default:
        this.router.navigate([RouterPaths.dashboard.user.activities.client.asPath]);
    }
  }

  public onSwitchVisibility(toVisible: boolean): void {
    if (toVisible) {
      this.store.dispatch(new VisibilityUiActions.SetUiVisibilityVisibleAction());
    } else {
      this.store.dispatch(new VisibilityUiActions.SetUiVisibilityInvisibleAction());
    }
  }

  public onSwitchAccount(switchAccountType: UserTypeEnum): void {
    this.store.dispatch(new NavbarActions.SetUserType(switchAccountType));
  }

  private assignValues(navbarData: INavbarData): void {
    this.userType = navbarData.getUserType;
    this.expertProfileId = navbarData.getSession.session.expertProfileId;
    this.organizationProfileId = navbarData.getSession.session.organizationProfileId;
    this.navigationItems = this.assignNavigationItems(navbarData.getSession);
    this.assignNavigationDetails(navbarData);
  }

  private handleError(err: HttpErrorResponse): Observable<undefined> {
    this.loggerService.warn('error when get profile details: ', err);

    return of(undefined);
  }

  private assignNavigationItems(session: GetSessionWithAccount): ReadonlyArray<INavigationItem> {
    return this.navbarComponentService.getFilteredNavigationItems(this.userType, session);
  }

  private assignNavigationDetails({ getSession, expertProfileData, organizationProfileData }: INavbarData): void {
    switch (this.userType) {
      case UserTypeEnum.EXPERT:
        this.assignAvatarAndName(expertProfileData);
        this.switchAccountAvatarToken = this.getSwitchAccountCompanyDetails(organizationProfileData);
        this.switchAccountType = UserTypeEnum.COMPANY;
        break;

      case UserTypeEnum.COMPANY:
        this.assignAvatarAndName(organizationProfileData);
        this.switchAccountAvatarToken = this.getSwitchAccountCompanyDetails(expertProfileData);
        this.switchAccountType = UserTypeEnum.EXPERT;
        break;

      case UserTypeEnum.USER:
        this.assignUserNavigationDetails(getSession);
        this.switchAccountType = undefined;
        break;

      default:
        this.loggerService.error('unhandled user type when assignUserNavigationDetails', this.userType);
    }
  }

  private assignAvatarAndName(profileDetails?: GetProfileWithDocuments): void {
    if (typeof profileDetails !== 'undefined') {
      this.userName = profileDetails.profile.name;
      this.userAvatarToken = profileDetails.profile.avatar;
    }
  }

  private assignUserNavigationDetails(session: GetSessionWithAccount): void {
    this.userName = session.account.details.nickname || '';
    this.userAvatarToken = session.account.details.avatar || '';
  }

  private getSwitchAccountCompanyDetails(profileDetails?: GetProfileWithDocuments): string {
    return profileDetails ? profileDetails.profile.avatar : '';
  }
}
