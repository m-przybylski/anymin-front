// tslint:disable:no-mixed-interface
import { GetSessionWithAccount } from '@anymind-ng/api';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export enum NavigationItemGroupsEnum {
  NAVBAR,
  SETTINGS,
  CREATE_PROFILE,
  ADDITIONAL,
}

export interface INavigationItem {
  trKey: string;
  url: string;
  iconClass?: string;
  isUser: boolean;
  isExpert: boolean;
  isCompany: boolean;
  group: NavigationItemGroupsEnum;
  callbackFnName?: string;
  isCounter?: boolean;
  counter?: Observable<number>;
  hasInvitationsCounter?: boolean;
  isVisible?(session: GetSessionWithAccount): boolean;
}

export const NAVIGATIONITEMS: InjectionToken<ReadonlyArray<INavigationItem>> = new InjectionToken(
  'navigation item config',
);

export const navigationItems: ReadonlyArray<INavigationItem> = [
  {
    trKey: 'NAVBAR.COMPANY_ACTIVITIES',
    url: '/dashboard/company/activities',
    iconClass: 'list',
    isUser: false,
    isExpert: false,
    isCompany: true,
    group: NavigationItemGroupsEnum.NAVBAR,
    isCounter: true,
  },
  {
    trKey: 'NAVBAR.ACTIVITIES',
    url: '/dashboard/user/activities/expert',
    iconClass: 'list',
    isUser: false,
    isExpert: true,
    isCompany: false,
    group: NavigationItemGroupsEnum.NAVBAR,
    isCounter: true,
  },
  // TODO uncomment this after Beta release ends
  // {
  //   trKey: 'NAVBAR.DISCOVER',
  //   url: '/dashboard/user/discover',
  //   iconClass: 'discovery',
  //   isUser: true,
  //   isExpert: true,
  //   isCompany: false,
  //   group: NavigationItemGroupsEnum.NAVBAR,
  // },
  // {
  //   trKey: 'NAVBAR_USER_MENU.FAVOURITES',
  //   url: '/dashboard/user/favourites',
  //   iconClass: 'avatar',
  //   isUser: true,
  //   isExpert: true,
  //   isCompany: false,
  //   group: NavigationItemGroupsEnum.NAVBAR,
  // },
  {
    trKey: 'NAVBAR_USER_MENU.ACTIVITIES',
    url: '/dashboard/user/activities/client',
    iconClass: 'activities',
    isUser: false,
    isExpert: false,
    isCompany: false,
    group: NavigationItemGroupsEnum.NAVBAR,
  },
  {
    trKey: 'NAVBAR_USER_MENU.ACTIVITIES',
    url: '/dashboard/user/activities/client',
    iconClass: 'activities',
    isUser: true,
    isExpert: false,
    isCompany: false,
    group: NavigationItemGroupsEnum.NAVBAR,
  },
  {
    trKey: 'NAVBAR_USER_MENU.SETTINGS',
    url: '/dashboard/user/settings',
    iconClass: 'settings',
    isUser: true,
    isExpert: true,
    isCompany: true,
    group: NavigationItemGroupsEnum.SETTINGS,
  },
  {
    trKey: 'NAVBAR_USER_MENU.PAYMENT_METHODS',
    url: '/dashboard/user/payments',
    iconClass: 'account-payments',
    isUser: true,
    isExpert: true,
    isCompany: true,
    group: NavigationItemGroupsEnum.SETTINGS,
  },
  {
    trKey: 'NAVBAR_USER_MENU.BECOME_CONSULTANT',
    url: '',
    iconClass: 'expert',
    isUser: true,
    isExpert: false,
    isCompany: true,
    /**
     * Function that You can call for additional filter of navigationItems
     *
     * @param session as GetSessionWithAccount
     *
     * @returns true if navigation item is visible for user
     */
    isVisible: (session: GetSessionWithAccount): boolean => !session.isExpert,
    group: NavigationItemGroupsEnum.CREATE_PROFILE,
    callbackFnName: 'openCreateProfileModalAsExpert',
  },
  {
    trKey: 'NAVBAR_USER_MENU.CREATE_COMPANY',
    url: '',
    iconClass: 'organization',
    isUser: true,
    isExpert: true,
    isCompany: false,
    /**
     * Function that You can call for additional filter of navigationItems
     *
     * @param session as GetSessionWithAccount
     *
     * @returns true if navigation item is visible for user
     */
    isVisible: (session: GetSessionWithAccount): boolean => !session.isCompany,
    group: NavigationItemGroupsEnum.CREATE_PROFILE,
    callbackFnName: 'openCreateOrganizationModal',
  },
  {
    trKey: 'NAVBAR_USER_MENU.INVITATIONS',
    url: '/dashboard/user/invitations/list',
    iconClass: 'mail',
    isUser: true,
    isExpert: true,
    isCompany: false,
    hasInvitationsCounter: true,
    group: NavigationItemGroupsEnum.ADDITIONAL,
  },
  // TODO uncomment this after Beta release ends
  // {
  //   trKey: 'NAVBAR_USER_MENU.INVITE_FRIENDS',
  //   url: '/dashboard/user/recommend-friends',
  //   iconClass: 'invite',
  //   isUser: true,
  //   isExpert: true,
  //   isCompany: true,
  //   group: NavigationItemGroupsEnum.ADDITIONAL,
  // },
  {
    trKey: 'NAVBAR_USER_MENU.LOGOUT',
    url: '',
    iconClass: 'logout',
    isUser: true,
    isExpert: true,
    isCompany: true,
    group: NavigationItemGroupsEnum.ADDITIONAL,
    callbackFnName: 'logout',
  },
];
