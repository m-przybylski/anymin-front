describe('Unit tests: CompanyPathController >', () => {
  describe('Testing Controller: CompanyPathController', () => {

    var CompanyPathController
    let scope
    let url = 'awesomeUrl/'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      module('profitelo.controller.dashboard.service-provider.company-path')
      inject(($rootScope, $controller, _ProfileApi_) => {
        scope = $rootScope.$new()
        CompanyPathController = $controller('CompanyPathController', {
          $scope: scope,
          ProfileApi: _ProfileApi_,
          savedProfile: {}
        })

      })
    })

    it('should exists', () => {
      return expect(!!CompanyPathController).toBe(true)
    })

  })
})
