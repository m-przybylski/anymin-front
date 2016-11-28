describe('Unit tests: CompanyProfileController >', () => {
  describe('Testing Controller: CompanyProfileController', () => {

    let CompanyProfileController
    let _scope

    const savedProfile = {
      organizationDetails: {},
      services: []
    }

    beforeEach(() => {
      module('profitelo.controller.company-profile')
      inject(($rootScope, $stateParams, $timeout, $controller, _smoothScrolling_) => {

        _scope = $rootScope.$new()

        CompanyProfileController = $controller('CompanyProfileController', {
          $scope: _scope,
          $stateParams: $stateParams,
          $timeout: $timeout,
          smoothScrolling: _smoothScrolling_,
          companyProfile: savedProfile,
          similarExperts: []
        })
      })
    })

    it('should exists', () => {
      expect(!!CompanyProfileController).toBe(true)
    })
  })
})
