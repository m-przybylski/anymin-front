(function() {
  function HelperService(CommonSettingsService) {

    let socialUrlResolver = (remoteUrl) => {
      let social

      let _socialNetworks = CommonSettingsService.localSettings.socialNetworks

      let _default = _.find(_socialNetworks, {
        name: 'Website'
      })

      for (let i = 0; i < _socialNetworks.length; i++) {
        social = _socialNetworks[i]
        if (remoteUrl.match(social.pattern)) {
          return social
        }
      }
      return _default
    }

    return {
      socialUrlResolver: socialUrlResolver
    }
  }

  angular.module('profitelo.services.helper-service', [
    'profitelo.services.commonSettings'
  ])
  .factory('HelperService', HelperService)

}())