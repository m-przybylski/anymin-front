import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import dashboardExpertManageProfileModule from './manage-profile'
import {DashboardExpertManageProfileController} from './manage-profile.controller'
import {ViewsApiMock} from 'profitelo-api-ng/api/api'

describe('Unit tests: dashboardExpertManageProfile >', () => {
  describe('Testing Controller: dashboardExpertManageProfile', () => {

    let dashboardExpertManageProfileController: DashboardExpertManageProfileController
    let ViewsApiMock: ViewsApiMock

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesome')
      $provide.value('ViewsApi', ViewsApiMock)
    }))

    beforeEach(() => {
      angular.mock.module(dashboardExpertManageProfileModule)
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$state_: ng.ui.IStateService) => {
        dashboardExpertManageProfileController = $controller(DashboardExpertManageProfileController, {
          $state: _$state_,
          $scope: $rootScope.$new()
        })
      })
    })

    it('should exists', () => {
      expect(!!dashboardExpertManageProfileController).toBe(true)
    })
  })
})

