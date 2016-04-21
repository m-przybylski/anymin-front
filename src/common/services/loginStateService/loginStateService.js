(function() {

  function loginStateService($state, $timeout) {

    let _account = {
      phoneNumber: {
        prefix: null,
        number: null
      },
      password: ''
    }

    return {
      setAccountObject: (account) => {
        _account = account
      },
      getAccountObject: () => {
        return angular.copy(_account)
      },
      getFullPhoneNumber: () => {
        return String(_account.phoneNumber.prefix) + String(_account.phoneNumber.number)
      }
    }
  }

  angular.module('profitelo.services.login-state', [
    'ui.router'
  ])
  .service('loginStateService', loginStateService)

}())