// tslint:disable:cyclomatic-complexity
import { Inject, Injectable } from '@angular/core';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { GetSessionWithAccount, ProfileService } from '@anymind-ng/api';
import { Observable } from 'rxjs';
import { GetProfileWithDocuments } from '@anymind-ng/api/model/getProfileWithDocuments';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { INavigationItem, NAVIGATIONITEMS } from '@platform/features/dashboard/components/navbar/navigation';
import { select, Store } from '@ngrx/store';
import * as fromDashboard from '@platform/features/dashboard/reducers';

@Injectable()
export class NavbarComponentService extends Logger {
  protected loggerService: LoggerService;

  private readonly userTypeMap = new Map<UserTypeEnum, (item: INavigationItem) => boolean>([
    [UserTypeEnum.COMPANY, (item): boolean => item.isCompany],
    [UserTypeEnum.EXPERT, (item): boolean => item.isExpert],
    [UserTypeEnum.USER, (item): boolean => item.isUser],
  ]);

  constructor(
    private profileService: ProfileService,
    private store: Store<fromDashboard.IState>,
    loggerFactory: LoggerFactory,
    @Inject(NAVIGATIONITEMS) private navigationItems: ReadonlyArray<INavigationItem>,
  ) {
    super(loggerFactory.createLoggerService('NavbarComponentService'));
  }

  public getProfileData = (accountId: string): Observable<GetProfileWithDocuments> =>
    this.profileService.getProfileRoute(accountId);

  public getFilteredNavigationItems = (
    userType: UserTypeEnum,
    session: GetSessionWithAccount,
  ): ReadonlyArray<INavigationItem> => {
    const filterFn = this.userTypeMap.get(userType);
    if (typeof filterFn !== 'undefined') {
      return this.navigationItems.filter(navigationItem => {
        if (navigationItem.isCounter && navigationItem.isCompany) {
          navigationItem.counter = this.store.pipe(select(fromDashboard.getCompanyCounters));
        } else if (navigationItem.isCounter && navigationItem.isExpert) {
          navigationItem.counter = this.store.pipe(select(fromDashboard.getExpertActivitiesCounter));
        } else if (navigationItem.hasInvitationsCounter && navigationItem.isExpert) {
          navigationItem.counter = this.store.pipe(select(fromDashboard.getInvitationsCounter));
        }

        if (navigationItem.isVisible) {
          return navigationItem.isVisible(session) && filterFn(navigationItem);
        }

        return filterFn(navigationItem);
      });
    }
    this.loggerService.error('unhandled user type when assignNavigationItems', userType);

    return [];
  };
}
