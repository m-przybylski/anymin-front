describe('Unit tests: ConsultationRangeController >', () => {
  describe('Testing Controller: ConsultationRangeController', () => {

    var ConsultationRangeController
    let _scope
    let url = 'awesomeUrl/'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      module('profitelo.controller.dashboard.service-provider.consultation-range')
      inject(($rootScope, $controller, _ProfileApi_) => {

        _scope = $rootScope.$new()

        ConsultationRangeController = $controller('ConsultationRangeController', {
          $scope: _scope,
          ProfileApi: _ProfileApi_,
          savedProfile: {}
        })

      })
    })

    it('should exists', () => {
      return expect(!!ConsultationRangeController).toBe(true)
    })

  })
})
