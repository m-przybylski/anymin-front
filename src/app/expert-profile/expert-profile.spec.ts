import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {ProfileApi} from 'profitelo-api-ng/api/api'
import {RecommendedServicesService} from '../../common/services/recommended-services/recommended-services.service'
import {SmoothScrollingService} from '../../common/services/smooth-scrolling/smooth-scrolling.service'
import './expert-profile'
import expertProfilePageModule from './expert-profile'
import recommendedServicesModule from '../../common/services/recommended-services/recommended-services'

describe('Unit tests: ExpertProfileController >', () => {
  describe('Testing Controller: ExpertProfileController', () => {

    let ExpertProfileController: any
    let _scope: any

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', 'awesomeURL/')
    }))

    beforeEach(() => {
      angular.mock.module(expertProfilePageModule)
      angular.mock.module(recommendedServicesModule)

      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $timeout: ng.ITimeoutService,
              $q: ng.IQService, $stateParams: ng.ui.IStateParamsService, _smoothScrollingService_: SmoothScrollingService,
              _recommendedServices_: RecommendedServicesService, ProfileApi: ProfileApi) => {


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
