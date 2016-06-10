describe('Unit tests: ServiceProviderStepController >', () => {
  describe('Testing Controller: ServiceProviderStepController', () => {

    var ServiceProviderStepController
    let _scope
    let url = 'awesomeUrl/'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      module('profitelo.controller.dashboard.service-provider.consultation-range')
      inject(($rootScope, $controller, _ProfileApi_) => {

        _scope = $rootScope.$new()

        ServiceProviderStepController = $controller('ServiceProviderStepController', {
          $scope: _scope,
          ProfileApi: _ProfileApi_,
          savedProfile: {}
        })

      })
    })

    it('should exists', () => {
      return expect(!!ServiceProviderStepController).toBe(true)
    })

  })
})