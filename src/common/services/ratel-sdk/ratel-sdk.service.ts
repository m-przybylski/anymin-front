module profitelo.services.ratelSdk {

  function RatelSDK($window) {
    return $window.RatelSDK
  }

  angular.module('ratelSdk', [])
  .factory('ratelSdk', RatelSDK)
}