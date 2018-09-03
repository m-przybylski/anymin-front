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
        asPath: 'dashboard/user/profile/:expertId',
        getName: 'profile/:expertId',
        params: {
          expertId: 'expertId',
        },
      },
      invitations: {
        asPath: 'dashboard/user/invitations',
        getName: 'invitations',
      },
    },
    company: {
      asPath: 'dashboard/company',
      getName: 'company',
      profile: {
        asPath: 'dashboard/company/profile/:profileId',
        getName: 'profile/:profileId',
        params: {
          profileId: 'profileId',
        },
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

export const RouterPathsToken: InjectionToken<typeof RouterPaths> = new InjectionToken<typeof RouterPaths>(
  'Injection token for injecting RouterPaths',
);
