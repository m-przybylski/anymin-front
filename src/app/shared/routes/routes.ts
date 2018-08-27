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
    expert: {
      asPath: 'dashboard/expert-view/:expertId',
      getName: 'expert-view/:expertId',
      params: {
        expertId: 'expertId',
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
};
