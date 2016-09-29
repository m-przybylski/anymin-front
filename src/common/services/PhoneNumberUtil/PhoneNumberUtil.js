(function() {

  function PhoneNumberUtilFacotry(phonenumbers) {
    return phonenumbers.PhoneNumberUtil.getInstance()
  }

  angular.module('PhoneNumberUtil', [
    'phonenumbers'
  ])
    .service('PhoneNumberUtil', PhoneNumberUtilFacotry)
}())