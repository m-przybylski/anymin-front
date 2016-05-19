describe('Unit tests: CompanyPathController >', () => {
  describe('Testing Controller: CompanyPathController', () => {

    var CompanyPathController
    let _scope
    let url = 'awesomeUrl/'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      module('profitelo.controller.dashboard.service-provider.company-path')
      inject(($rootScope, $controller, _ProfileApi_) => {

        _scope = $rootScope.$new()

        _scope.$parent.serviceProviderController = {
          profileTypes: {
            'INDIVIDUAL': 'INDIVIDUAL',
            'COMPANY': 'COMPANY'
          }
        }

        CompanyPathController = $controller('CompanyPathController', {
          $scope: _scope,
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
