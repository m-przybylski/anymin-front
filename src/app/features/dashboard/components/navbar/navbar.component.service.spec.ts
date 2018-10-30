import { TestBed } from '@angular/core/testing';
import { LoggerService } from '@anymind-ng/core';
import { ProfileService } from '@anymind-ng/api';
import { Deceiver } from 'deceiver-core';
import { GetSessionWithAccount } from '@anymind-ng/api/model/getSessionWithAccount';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import SpyObj = jasmine.SpyObj;
import { NavbarComponentService } from '@platform/features/dashboard/components/navbar/navbar.component.service';
import {
  INavigationItem,
  NavigationItemGroupsEnum,
  NAVIGATIONITEMS,
} from '@platform/features/dashboard/components/navbar/navigation';
import { provideMockFactoryLogger } from '../../../../../testing/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import * as fromDashboard from '@platform/features/dashboard/reducers';

describe('NavbarComponentService', () => {
  let navbarComponentService: SpyObj<NavbarComponentService>;
  let store: Store<fromDashboard.IState>;
  const loggerService: LoggerService = Deceiver(LoggerService, {
    error: jasmine.createSpy(''),
  });
  const mockSession: GetSessionWithAccount = {
    account: {
      id: 'id',
      msisdn: '+48555555555',
      registeredAt: new Date(),
      isBlocked: false,
      hasPassword: true,
      isClientCompany: true,
      isAnonymous: false,
      details: {
        clientId: 'id',
      },
      currency: 'PLN',
      countryISO: 'pl',
    },
    session: {
      accountId: 'id',
      apiKey: 'apiKey',
      ipAddress: '0.0.0.0',
      isExpired: false,
      lastActivityAt: new Date(),
    },
    isCompany: false,
    isExpert: true,
  };
  const mockNavigationItems: ReadonlyArray<INavigationItem> = [
    {
      trKey: 'NAVBAR.COMPANY_ACTIVITIES',
      url: '/dashboard/company/activities',
      iconClass: 'icon-list',
      isUser: true,
      isExpert: false,
      isCompany: false,
      group: NavigationItemGroupsEnum.NAVBAR,
    },
    {
      trKey: 'NAVBAR_USER_MENU.INVITE_FRIENDS',
      url: '/dashboard/user/recommend',
      iconClass: 'icon-invite',
      isUser: false,
      isExpert: true,
      isCompany: false,
      group: NavigationItemGroupsEnum.ADDITIONAL,
    },
    {
      trKey: 'NAVBAR_USER_MENU.LOGOUT',
      url: '',
      iconClass: 'icon-logout',
      isUser: false,
      isExpert: false,
      isCompany: true,
      group: NavigationItemGroupsEnum.ADDITIONAL,
      callbackFnName: 'logout',
    },
    {
      trKey: 'NAVBAR_USER_MENU.CREATE_COMPANY',
      url: '',
      iconClass: 'icon-organization',
      isUser: false,
      isExpert: true,
      isCompany: false,
      isVisible: (session: GetSessionWithAccount): boolean => !session.isCompany,
      group: NavigationItemGroupsEnum.CREATE_PROFILE,
      callbackFnName: 'openCreateOrganizationModal',
    },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromDashboard.reducers,
          dashboard: combineReducers(fromDashboard.reducers),
        }),
      ],
      providers: [
        NavbarComponentService,
        {
          provide: ProfileService,
          useValue: Deceiver(ProfileService),
        },
        {
          provide: NAVIGATIONITEMS,
          useValue: mockNavigationItems,
        },
        provideMockFactoryLogger(loggerService),
      ],
    });
    (loggerService.error as jasmine.Spy).calls.reset();
    store = TestBed.get(Store);
    navbarComponentService = TestBed.get(NavbarComponentService);
  });

  it('should return filtered array by USER user type of navigation items', () => {
    const mockUserType = UserTypeEnum.USER;
    const result = navbarComponentService.getFilteredNavigationItems(mockUserType, mockSession);
    expect(result).toEqual([
      {
        trKey: 'NAVBAR.COMPANY_ACTIVITIES',
        url: '/dashboard/company/activities',
        iconClass: 'icon-list',
        isUser: true,
        isExpert: false,
        isCompany: false,
        group: NavigationItemGroupsEnum.NAVBAR,
      },
    ]);
  });

  it('should return filtered array by EXPERT user type of navigation items', () => {
    const mockUserType = UserTypeEnum.EXPERT;
    const result = navbarComponentService.getFilteredNavigationItems(mockUserType, mockSession);
    expect(result).toEqual([
      {
        trKey: 'NAVBAR_USER_MENU.INVITE_FRIENDS',
        url: '/dashboard/user/recommend',
        iconClass: 'icon-invite',
        isUser: false,
        isExpert: true,
        isCompany: false,
        group: NavigationItemGroupsEnum.ADDITIONAL,
      },
      {
        trKey: 'NAVBAR_USER_MENU.CREATE_COMPANY',
        url: '',
        iconClass: 'icon-organization',
        isUser: false,
        isExpert: true,
        isCompany: false,
        isVisible: jasmine.any(Function),
        group: NavigationItemGroupsEnum.CREATE_PROFILE,
        callbackFnName: 'openCreateOrganizationModal',
      },
    ]);
  });

  it('should return filtered array by COMPANY user type of navigation items', () => {
    const mockUserType = UserTypeEnum.COMPANY;
    const result = navbarComponentService.getFilteredNavigationItems(mockUserType, mockSession);
    expect(result).toEqual([
      {
        trKey: 'NAVBAR_USER_MENU.LOGOUT',
        url: '',
        iconClass: 'icon-logout',
        isUser: false,
        isExpert: false,
        isCompany: true,
        group: NavigationItemGroupsEnum.ADDITIONAL,
        callbackFnName: 'logout',
      },
    ]);
  });

  it('should log error and return empty array when try to filter navbar items with unknown user type', () => {
    const unhandledUserTypeEnum = 5;
    const result = navbarComponentService.getFilteredNavigationItems(unhandledUserTypeEnum, mockSession);
    expect(result).toEqual([]);
    expect(loggerService.error).toHaveBeenCalled();
  });
});
