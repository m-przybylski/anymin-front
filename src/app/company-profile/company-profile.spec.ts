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

    beforeEach(angular.mock.module(function($provide) {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.controller.company-profile')
    angular.mock.module('profitelo.services.recommended-services')
      inject(($rootScope, $stateParams, $timeout, $controller, $q, _smoothScrollingService_, _recommendedServices_) => {

        spyOn(_recommendedServices_, 'getRecommendedCompanies').and.callFake(() =>
          $q.resolve([]))

        _scope = $rootScope.$new()

        CompanyProfileController = $controller('CompanyProfileController', {
          $scope: _scope,
          $stateParams: $stateParams,
          $timeout: $timeout,
          companyProfile: companyProfile,
          smoothScrollingService: _smoothScrollingService_,
          recommendedServices: _recommendedServices_
        })
      })
    })

    it('should exists', () => {
      expect(!!CompanyProfileController).toBe(true)
    })
  })
})
