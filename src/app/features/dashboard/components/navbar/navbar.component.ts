import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GetExpertVisibility, GetProfileWithDocuments, GetSessionWithAccount } from '@anymind-ng/api';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import * as fromCore from '@platform/core/reducers';
import * as fromRoot from '@platform/reducers';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject, EMPTY } from 'rxjs';
import { NavbarActions } from '@platform/core/actions';
import { NavbarComponentService } from './navbar.component.service';
import { INavigationItem } from '@platform/features/dashboard/components/navbar/navigation';
import { VisibilityUiActions } from '@platform/features/dashboard/actions';
import * as fromDashboard from '@platform/features/dashboard/reducers';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { RouterPaths } from '@platform/shared/routes/routes';

interface INavbarData {
  profileData?: GetProfileWithDocuments;
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
  public accountId: string;
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
        switchMap(({ getSession, getUserType }: { getSession: GetSessionWithAccount; getUserType: UserTypeEnum }) => {
          const profileId = this.getProfileId(getUserType, getSession);
          if (profileId) {
            return this.navbarComponentService.getProfileData(profileId).pipe(
              catchError(err => this.handleError(err)),
              map(profileData => ({ profileData, getSession, getUserType })),
            );
          }

          return EMPTY;
        }),
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
    this.accountId = navbarData.getSession.account.id;
    this.assignNavigationItems(navbarData.getSession);
    this.assignNavigationDetails(navbarData.getSession, navbarData.profileData);
  }

  private handleError(err: HttpErrorResponse): Observable<undefined> {
    this.loggerService.warn('error when get profile details: ', err);

    return of(undefined);
  }

  private assignNavigationItems(session: GetSessionWithAccount): void {
    this.navigationItems = this.navbarComponentService.getFilteredNavigationItems(this.userType, session);
  }

  private assignNavigationDetails(session: GetSessionWithAccount, profileDetails?: GetProfileWithDocuments): void {
    switch (this.userType) {
      case UserTypeEnum.EXPERT:
        this.assignExpertNavigationDetails(profileDetails);
        break;

      case UserTypeEnum.COMPANY:
        this.assignCompanyNavigationDetails(profileDetails);
        break;

      case UserTypeEnum.USER:
        this.assignUserNavigationDetails(session, profileDetails);
        break;

      default:
        this.loggerService.error('unhandled user type when assignUserNavigationDetails', this.userType);
    }
  }

  private assignExpertNavigationDetails(profileDetails?: GetProfileWithDocuments): void {
    if (typeof profileDetails !== 'undefined') {
      this.userName = profileDetails.profile.name;
      this.userAvatarToken = profileDetails.profile.avatar;
    }
    this.assignSwitchAccountCompanyDetails(profileDetails);
  }

  private assignCompanyNavigationDetails(profileDetails?: GetProfileWithDocuments): void {
    if (typeof profileDetails !== 'undefined') {
      this.userName = profileDetails.profile.name;
      this.userAvatarToken = profileDetails.profile.avatar;
    }

    if (typeof profileDetails !== 'undefined') {
      this.switchAccountAvatarToken = profileDetails.profile.avatar;
      this.switchAccountType = UserTypeEnum.EXPERT;

      return;
    }
    this.switchAccountAvatarToken = '';
    this.switchAccountType = UserTypeEnum.USER;
  }

  private assignUserNavigationDetails(session: GetSessionWithAccount, profileDetails?: GetProfileWithDocuments): void {
    this.userName = session.account.details.nickname || '';
    this.userAvatarToken = session.account.details.avatar || '';
    this.assignSwitchAccountCompanyDetails(profileDetails);
  }

  private assignSwitchAccountCompanyDetails(profileDetails?: GetProfileWithDocuments): void {
    if (typeof profileDetails !== 'undefined') {
      this.switchAccountAvatarToken = profileDetails.profile.avatar;
      this.switchAccountType = UserTypeEnum.COMPANY;

      return;
    }
    this.switchAccountAvatarToken = '';
    this.switchAccountType = undefined;
  }

  private getProfileId(userType: UserTypeEnum, getSessionWithAccount: GetSessionWithAccount): string | undefined {
    switch (userType) {
      case UserTypeEnum.EXPERT:
        return getSessionWithAccount.session.expertProfileId;
      case UserTypeEnum.COMPANY:
        return getSessionWithAccount.session.organizationProfileId;
      default:
        return undefined;
    }
  }
}
