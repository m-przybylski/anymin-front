(function() {

  function serviceProviderStateService() {

    let _service = {
      phoneNumber: {
        prefix: null,
        number: null
      },
      password: ''
    }

    let _emptyService = angular.copy(_service)

    return {
      setServiceObject: (service) => {
        _service = service
      },
      getServiceObject: () => {
        return angular.copy(_service)
      },
      clearServiceObject: () => {
        _service = angular.copy(_emptyService)
      }
    }
  }

  angular.module('profitelo.services.service-provider-state', [
    'ui.router'
  ])
  .service('serviceProviderStateService', serviceProviderStateService)

}())