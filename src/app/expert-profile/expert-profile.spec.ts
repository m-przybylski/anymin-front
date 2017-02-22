namespace profitelo.expertProfile {

  import ISmoothScrollingService = profitelo.services.smoothScrolling.ISmoothScrollingService
  import IRecommendedServicesService = profitelo.services.recommendedServices.IRecommendedServicesService
  import IProfileApi = profitelo.api.IProfileApi

  describe('Unit tests: ExpertProfileController >', () => {
  describe('Testing Controller: ExpertProfileController', () => {

    let ExpertProfileController: any
    let _scope: any

    beforeEach(angular.mock.module(function($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', 'awesomeURL/')
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.controller.expert-profile')
    angular.mock.module('profitelo.services.recommended-services')

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $timeout: ng.ITimeoutService,
              $q: ng.IQService, $stateParams: ng.ui.IStateParamsService, _smoothScrollingService_: ISmoothScrollingService,
              _recommendedServices_: IRecommendedServicesService, ProfileApi: IProfileApi) => {


        jasmine.createSpyObj('ProfileApi', ['postProfileFavouriteExpertRoute'])

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
          ProfileApi: ProfileApi,
        })
      })
    })

    it('should exists', () => {
      expect(!!ExpertProfileController).toBe(true)
    })

  })
})
}
