describe('Unit tests: ExpertProfileController >', () => {
  describe('Testing Controller: ExpertProfileController', () => {

    let ExpertProfileController
    let _scope
    let ProfileApi

    beforeEach(angular.mock.module(function($provide) {
      $provide.value('apiUrl', 'awesomeURL/')
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.controller.expert-profile')
    angular.mock.module('profitelo.services.recommended-services')

      inject(($rootScope, $controller, $timeout, $q, $stateParams, _smoothScrollingService_, _recommendedServices_, _ProfileApi_) => {
        ProfileApi = {
          postProfileFavouriteExpert: (fn) => {
            fn()
          }
        }
        _scope = $rootScope.$new()

        spyOn(_recommendedServices_, 'getRecommendedCompanies').and.callFake(() =>
          $q.resolve([]))

        ExpertProfileController = $controller('ExpertProfileController', {
          $scope: _scope,
          $stateParams: $stateParams,
          $timeout: $timeout,
          smoothScrollingService: _smoothScrollingService_,
          expertOrganizations: [],
          recommendedServices: _recommendedServices_,
          expertProfile: {type: '', profile: {expertDetails: {}}},
          ProfileApi: _ProfileApi_,
        })
      })
    })

    it('should exists', () => {
      expect(!!ExpertProfileController).toBe(true)
    })

  })
})
