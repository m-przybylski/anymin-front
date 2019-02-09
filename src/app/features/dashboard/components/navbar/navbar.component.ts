import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GetExpertVisibility, GetProfileWithDocuments, GetSessionWithAccount } from '@anymind-ng/api';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import * as fromCore from '@platform/core/reducers';
import * as fromRoot from '@platform/reducers';
import { filter, switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { NavbarActions } from '@platform/core/actions';
import { NavbarComponentService } from './navbar.component.service';
import { INavigationItem } from '@platform/features/dashboard/components/navbar/navigation';
import { VisibilityUiActions } from '@platform/features/dashboard/actions';
import * as fromDashboard from '@platform/features/dashboard/reducers';
import { select, Store } from '@ngrx/store';

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
          this.navbarComponentService.getProfileData(getSession.account.id).pipe(
            catchError(err => this.handleError(err)),
            map(profileData => ({ profileData, getSession, getUserType })),
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
    if (typeof profileDetails !== 'undefined' && typeof profileDetails.profile.expertDetails !== 'undefined') {
      this.userName = profileDetails.profile.expertDetails.name;
      this.userAvatarToken = profileDetails.profile.expertDetails.avatar;
    }
    this.assignSwitchAccountCompanyDetails(profileDetails);
  }

  private assignCompanyNavigationDetails(profileDetails?: GetProfileWithDocuments): void {
    if (typeof profileDetails !== 'undefined' && typeof profileDetails.profile.organizationDetails !== 'undefined') {
      this.userName = profileDetails.profile.organizationDetails.name;
      this.userAvatarToken = profileDetails.profile.organizationDetails.logo;
    }

    if (typeof profileDetails !== 'undefined' && typeof profileDetails.profile.expertDetails !== 'undefined') {
      this.switchAccountAvatarToken = profileDetails.profile.expertDetails.avatar;
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
    if (typeof profileDetails !== 'undefined' && typeof profileDetails.profile.organizationDetails !== 'undefined') {
      this.switchAccountAvatarToken = profileDetails.profile.organizationDetails.logo;
      this.switchAccountType = UserTypeEnum.COMPANY;

      return;
    }
    this.switchAccountAvatarToken = '';
    this.switchAccountType = undefined;
  }
}
