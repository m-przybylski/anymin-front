describe('Unit tests: ExpertProfileController >', () => {
  describe('Testing Controller: ExpertProfileController', () => {

    let ExpertProfileController
    let _scope

    let url = 'awesomeUrl/'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      module('profitelo.controller.expert-profile')
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
