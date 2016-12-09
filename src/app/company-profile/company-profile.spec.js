describe('Unit tests: CompanyProfileController >', () => {
  describe('Testing Controller: CompanyProfileController', () => {

    let CompanyProfileController
    let _scope

    const companyProfile = {
      profile: {
        organizationDetails: {
          
        }
      }
    }

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
      module('profitelo.controller.company-profile')
      module('profitelo.services.recommended-profiles-service')
      inject(($rootScope, $stateParams, $timeout, $controller, $q, _smoothScrolling_, _recommendedProfilesServices_) => {

        spyOn(_recommendedProfilesServices_, 'getRecommendedCompanies').and.callFake(() =>
          $q.resolve([]))

        _scope = $rootScope.$new()

        CompanyProfileController = $controller('CompanyProfileController', {
          $scope: _scope,
          $stateParams: $stateParams,
          $timeout: $timeout,
          companyProfile: companyProfile,
          smoothScrolling: _smoothScrolling_,
          recommendedProfilesServices: _recommendedProfilesServices_
        })
      })
    })

    it('should exists', () => {
      expect(!!CompanyProfileController).toBe(true)
    })
  })
})
