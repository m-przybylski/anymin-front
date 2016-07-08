describe('Unit tests: CompanyProfileController >', () => {
  describe('Testing Controller: CompanyProfileController', () => {

    let CompanyProfileController
    let _scope

    let url = 'awesomeUrl/'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      module('profitelo.controller.company-profile')
      inject(($rootScope, $controller, _ProfileApi_, _User_) => {

        _scope = $rootScope.$new()

        _scope.$parent.serviceProviderController = {
          profileTypes: {
            'INDIVIDUAL': 'INDIVIDUAL',
            'COMPANY': 'COMPANY'
          }
        }

        CompanyProfileController = $controller('CompanyProfileController', {
          $scope: _scope,
          ProfileApi: _ProfileApi_,
          User: _User_,
          savedProfile: {},
          companyImage: {},
          checkAccount: {}
        })


      })
    })

    it('should exists', () => {
      expect(!!CompanyProfileController).toBe(true)
    })

  })
})
