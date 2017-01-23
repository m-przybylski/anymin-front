module profitelo.services.phonenumbers {

  function PhonenumbersFactory($window) {
    return $window.i18n.phonenumbers
  }

  angular.module('phonenumbers', [])
  .factory('phonenumbers', PhonenumbersFactory)
}