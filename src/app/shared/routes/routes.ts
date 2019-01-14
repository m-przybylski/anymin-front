import { InjectionToken } from '@angular/core';

export class RouterHelpers {
  public static replaceParams = (pathToReplace: string, params: { [key: string]: string }): string =>
    Object.keys(params)
      .map(key => `:${key}`)
      .reduce((newPath, key) => newPath.replace(key, params[key.substr(1)]), pathToReplace);
}
export const RouterPaths = {
  dashboard: {
    asPath: 'dashboard',
    getName: 'dashboard',
    user: {
      asPath: 'dashboard/user',
      getName: 'user',
      profile: {
        asPath: '/dashboard/user/profile/:expertId',
        getName: 'profile/:expertId',
        params: {
          expertId: 'expertId',
        },
      },
      activities: {
        asPath: 'dashboard/user/activities',
        getName: 'activities',
        expert: {
          asPath: '/dashboard/user/activities/expert',
          getName: 'expert',
        },
        client: {
          asPath: '/dashboard/user/activities/client',
          getName: 'client',
        },
      },
      invitations: {
        asPath: '/dashboard/user/invitations',
        getName: 'invitations',
      },
      welcome: {
        asPath: '/dashboard/user/welcome-to-anymind',
        getName: 'welcome-to-anymind',
      },
      settings: {
        asPath: 'dashboard/user/settings',
        getName: 'settings',
      },
      payments: {
        asPath: 'dashboard/user/payments',
        getName: 'payments',
      },
      recommendFriends: {
        asPath: 'dashboard/user/recommend-friends',
        getName: 'recommend-friends',
      },
    },
    company: {
      asPath: 'dashboard/company',
      getName: 'company',
      profile: {
        asPath: '/dashboard/company/profile/:profileId',
        getName: 'profile/:profileId',
        params: {
          profileId: 'profileId',
        },
      },
      activities: {
        asPath: '/dashboard/company/activities',
        getName: 'activities',
      },
    },
    notfound: {
      asPath: 'dashboard/not-found',
      getName: 'not-found',
    },
  },
  browse: {
    asPath: 'browse',
    getName: 'browse',
    user: {
      asPath: 'browse/user/profile/:expertId',
      getName: 'user/profile/:expertId',
      params: {
        expertId: 'expertId',
      },
    },
    company: {
      asPath: 'browse/company/profile/:profileId',
      getName: 'company/profile/:profileId',
      params: {
        profileId: 'profileId',
      },
    },
  },
};

export const ROUTER_PATHS_TOKEN: InjectionToken<typeof RouterPaths> = new InjectionToken<typeof RouterPaths>(
  'Injection token for injecting RouterPaths',
  { providedIn: 'root', factory: (): typeof RouterPaths => RouterPaths },
);
