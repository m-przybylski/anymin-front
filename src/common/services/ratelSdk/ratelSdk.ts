(function() {

  function factory($window) {
    return $window.RatelSDK
  }

  angular.module('ratelSdk', [])
    .factory('ratelSdk', factory)
}())