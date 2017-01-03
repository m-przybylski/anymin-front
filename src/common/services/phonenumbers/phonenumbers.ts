(function() {

  function phonenumbersFactory($window) {
    return $window.i18n.phonenumbers
  }

  angular.module('phonenumbers', [])
    .factory('phonenumbers', phonenumbersFactory)
}())