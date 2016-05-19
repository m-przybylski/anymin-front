describe('Unit tests: IndividualPathController >', () => {
  describe('Testing Controller: IndividualPathController', () => {

    let IndividualPathController
    let _scope

    let url = 'awesomeUrl/'
    
    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))
    
    beforeEach(() => {
      module('profitelo.controller.dashboard.service-provider.individual-path')
      inject(($rootScope, $controller, _ProfileApi_, _User_) => {

        _scope = $rootScope.$new()

        _scope.$parent.serviceProviderController = {
          profileTypes: {
            'INDIVIDUAL': 'INDIVIDUAL',
            'COMPANY': 'COMPANY'
          }
        }

        IndividualPathController = $controller('IndividualPathController', {
          $scope: _scope,
          ProfileApi: _ProfileApi_,
          User: _User_,
          savedProfile: {}
        })
        
        
      })
    })

    it('should exists', () => {
      return expect(!!IndividualPathController).toBe(true)
    })

  })
})
