import { Component } from '@angular/core';
import { GetExpertVisibility, GetProfileWithDocuments, GetSessionWithAccount } from '@anymind-ng/api';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import * as fromCore from '@platform/core/reducers';
import * as fromRoot from '@platform/reducers';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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
export class NavbarComponent extends Logger {
  public navigationItems: ReadonlyArray<INavigationItem>;
  public userAvatarToken: string;
  public userName: string;
  public switchAccountAvatarToken: string;
  public userType: UserTypeEnum;
  public switchAccountType?: UserTypeEnum;
  public accountId: string;
  public isMenuVisible$ = this.store.pipe(select(fromCore.getIsNavbarUserMenuVisible));
  public isUserVisible$ = this.store.pipe(
    select(fromDashboard.getVisibilityStatus),
    map(visibility => visibility === GetExpertVisibility.VisibilityEnum.Visible),
  );

  protected loggerService: LoggerService;

  private session: GetSessionWithAccount;

  constructor(
    private store: Store<fromRoot.IState>,
    private navbarComponentService: NavbarComponentService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('NavbarComponentService'));

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
      )
      .subscribe(this.assignValues);
  }
  public onSwitchVisibility = (toVisible: boolean): void => {
    if (toVisible) {
      this.store.dispatch(new VisibilityUiActions.SetUiVisibilityVisibleAction());
    } else {
      this.store.dispatch(new VisibilityUiActions.SetUiVisibilityInvisibleAction());
    }
  };

  public onSwitchAccount = (switchAccountType: UserTypeEnum): void => {
    this.store.dispatch(new NavbarActions.SetUserType(switchAccountType));
  };

  private assignValues = (navbarData: INavbarData): void => {
    this.userType = navbarData.getUserType;
    this.session = navbarData.getSession;
    this.accountId = navbarData.getSession.account.id;
    this.assignNavigationItems();
    this.assignNavigationDetails(navbarData.profileData);
  };

  private handleError = (err: HttpErrorResponse): Observable<undefined> => {
    this.loggerService.warn('error when get profile details: ', err);

    return of(undefined);
  };

  private assignNavigationItems = (): void => {
    this.navigationItems = this.navbarComponentService.getFilteredNavigationItems(this.userType, this.session);
  };

  private assignNavigationDetails = (profileDetails?: GetProfileWithDocuments): void => {
    switch (this.userType) {
      case UserTypeEnum.EXPERT:
        this.assignExpertNavigationDetails(profileDetails);
        break;

      case UserTypeEnum.COMPANY:
        this.assignCompanyNavigationDetails(profileDetails);
        break;

      case UserTypeEnum.USER:
        this.assignUserNavigationDetails(profileDetails);
        break;

      default:
        this.loggerService.error('unhandled user type when assignUserNavigationDetails', this.userType);
    }
  };

  private assignExpertNavigationDetails = (profileDetails?: GetProfileWithDocuments): void => {
    if (typeof profileDetails !== 'undefined' && typeof profileDetails.profile.expertDetails !== 'undefined') {
      this.userName = profileDetails.profile.expertDetails.name;
      this.userAvatarToken = profileDetails.profile.expertDetails.avatar;
    }
    this.assignSwitchAccountCompanyDetails(profileDetails);
  };

  private assignCompanyNavigationDetails = (profileDetails?: GetProfileWithDocuments): void => {
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
  };

  private assignUserNavigationDetails = (profileDetails?: GetProfileWithDocuments): void => {
    this.userName = this.session.account.details.nickname || '';
    this.userAvatarToken = this.session.account.details.avatar || '';
    this.assignSwitchAccountCompanyDetails(profileDetails);
  };

  private assignSwitchAccountCompanyDetails = (profileDetails?: GetProfileWithDocuments): void => {
    if (typeof profileDetails !== 'undefined' && typeof profileDetails.profile.organizationDetails !== 'undefined') {
      this.switchAccountAvatarToken = profileDetails.profile.organizationDetails.logo;
      this.switchAccountType = UserTypeEnum.COMPANY;

      return;
    }
    this.switchAccountAvatarToken = '';
    this.switchAccountType = undefined;
  };
}
