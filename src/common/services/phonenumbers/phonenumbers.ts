namespace profitelo.services.phonenumbers {

  import IWindowService = profitelo.services.window.IWindowService
  function PhonenumbersFactory($window: IWindowService) {
    return $window.i18n.phonenumbers
  }

  angular.module('phonenumbers', [])
  .factory('phonenumbers', PhonenumbersFactory)
}
