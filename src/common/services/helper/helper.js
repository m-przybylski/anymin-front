(function() {
  function HelperService(CommonSettingsService, CommonConfig) {

    const _commonConfig = CommonConfig.getAllData()

    const socialUrlResolver = (remoteUrl) => {
      const _socialNetworks = CommonSettingsService.localSettings.socialNetworks

      for (let i = 0; i < _socialNetworks.length; i++) {
        let social = _socialNetworks[i]
        if (remoteUrl.match(social.pattern)) {
          return social
        }
      }

      /* istanbul ignore next */
      return _.find(_socialNetworks, {
        name: 'Website'
      })
    }

    const fileUrlResolver = (fileId) => {
      return _commonConfig.urls.backend + _commonConfig.urls['file-download'].replace('%s', fileId)
    }

    return {
      socialUrlResolver: socialUrlResolver,
      fileUrlResolver: fileUrlResolver
    }
  }

  angular.module('profitelo.services.helper-service', [
    'profitelo.services.commonSettings',
    'commonConfig'
  ])
  .factory('HelperService', HelperService)

}())