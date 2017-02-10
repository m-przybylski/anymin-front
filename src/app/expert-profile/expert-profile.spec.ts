namespace profitelo.expertProfile {
import ISmoothScrollingService = profitelo.services.smoothScrolling.ISmoothScrollingService
  import IRecommendedServicesService = profitelo.services.recommendedServices.IRecommendedServicesService
  describe('Unit tests: ExpertProfileController >', () => {
  describe('Testing Controller: ExpertProfileController', () => {

    let ExpertProfileController: any
    let _scope: any
    let ProfileApi: any

    beforeEach(angular.mock.module(function($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', 'awesomeURL/')
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.controller.expert-profile')
    angular.mock.module('profitelo.services.recommended-services')

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $timeout: ng.ITimeoutService,
              $q: ng.IQService, $stateParams: ng.ui.IStateParamsService, _smoothScrollingService_: ISmoothScrollingService,
              _recommendedServices_: IRecommendedServicesService, _ProfileApi_: any) => {
        ProfileApi = {
          postProfileFavouriteExpert: (fn: any) => {
            fn()
          }
        }
        _scope = $rootScope.$new()

        spyOn(_recommendedServices_, 'getRecommendedCompanies').and.callFake(() =>
          $q.resolve([]))

        ExpertProfileController = $controller('ExpertProfileController', {
          $scope: _scope,
          $stateParams: $stateParams,
          $$timeout: $timeout,
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
}
