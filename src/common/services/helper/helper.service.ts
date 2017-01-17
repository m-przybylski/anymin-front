module profitelo.services.helper {

  export interface IHelperService {
    socialUrlResolver(url: string): string
    fileUrlResolver(url: string): string
  }

  class HelperService implements IHelperService {

    private commonConfig
    private commonSettingsService

    constructor(private CommonSettingsService, private CommonConfig: ICommonConfig, private lodash: _.LoDashStatic) {
      this.commonConfig = CommonConfig.getAllData()
      this.commonSettingsService = CommonSettingsService
    }

    socialUrlResolver = (remoteUrl) => {
      const _socialNetworks = this.commonSettingsService.localSettings.socialNetworks

      for (let i = 0; i < _socialNetworks.length; i++) {
        let social = _socialNetworks[i]
        if (remoteUrl.match(social.pattern)) {
          return social
        }
      }

      /* istanbul ignore next */
      return this.lodash.find(_socialNetworks, {
        name: 'Website'
      })
    }

    fileUrlResolver = (fileId) => {
      return this.commonConfig.urls.files + this.commonConfig.urls['file-download'].replace('%s', fileId)
    }
  }

  angular.module('profitelo.services.helper', [
    'profitelo.services.commonSettings',
    'ngLodash',
    'commonConfig'
  ])
  .service('HelperService', HelperService)
}