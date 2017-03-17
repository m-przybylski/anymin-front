import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {RecommendedServicesService} from '../../common/services/recommended-services/recommended-services.service'
import {SmoothScrollingService} from '../../common/services/smooth-scrolling/smooth-scrolling.service'
import './company-profile'

describe('Unit tests: CompanyProfileController >', () => {
  describe('Testing Controller: CompanyProfileController', () => {

    let CompanyProfileController: any
    let _scope

    const companyProfile = {
      profile: {
        organizationDetails: {}
      }
    }

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.controller.company-profile')
      angular.mock.module('profitelo.services.recommended-services')
      inject(($rootScope: IRootScopeService, $stateParams: ng.ui.IStateParamsService, $timeout: ng.ITimeoutService,
              $controller: ng.IControllerService, $q: ng.IQService,
              _smoothScrollingService_: SmoothScrollingService, _recommendedServices_: RecommendedServicesService) => {

        spyOn(_recommendedServices_, 'getRecommendedCompanies').and.callFake(() =>
          $q.resolve([]))

        _scope = $rootScope.$new()

        CompanyProfileController = $controller('CompanyProfileController', {
          $scope: _scope,
          $stateParams: $stateParams,
          $$timeout: $timeout,
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
