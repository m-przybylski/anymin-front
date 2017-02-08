namespace profitelo.services.helper {

  export interface IUrlService {
    resolveSocialUrl(url: string): string
    resolveFileUrl(url: string): string
  }

  class UrlService implements IUrlService {

    private commonConfig

    constructor(private CommonSettingsService, private lodash: _.LoDashStatic, CommonConfig: ICommonConfig) {
      this.commonConfig = CommonConfig.getAllData()
    }

    public resolveSocialUrl = (remoteUrl) => {
      const _socialNetworks = this.CommonSettingsService.localSettings.socialNetworks

      for (let i = 0; i < _socialNetworks.length; i++) {
        let social = _socialNetworks[i]
        if (remoteUrl.match(social.pattern)) {
          return social
        }
      }

      return this.lodash.find(_socialNetworks, {
        name: 'Website'
      })
    }

    public resolveFileUrl = (fileId) => {
      return this.commonConfig.urls.files + this.commonConfig.urls['file-download'].replace('%s', fileId)
    }
  }

  angular.module('profitelo.services.url', [
    'profitelo.services.commonSettings',
    'ngLodash',
    'commonConfig'
  ])
    .service('urlService', UrlService)
}
