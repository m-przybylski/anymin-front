namespace profitelo.services.ratelSdk {

  import IWindowService = profitelo.services.window.IWindowService
  function RatelSDK($window: IWindowService) {
    return $window.RatelSDK
  }

  angular.module('ratelSdk', [])
  .factory('ratelSdk', RatelSDK)
}
