import {DashboardSettingsPaymentsController} from './payments'
import {AccountApiMock} from 'profitelo-api-ng/api/api'
import * as angular from 'angular'
  describe('Unit tests: dashboardSettingsPaymentsController >', () => {
    describe('Testing Controller: dashboardSettingsPaymentsController', () => {

      let dashboardSettingsPaymentsController: DashboardSettingsPaymentsController
      let AccountApiMock: AccountApiMock

      let httpBackend: ng.IHttpBackendService
      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeUrl')
      }))

      beforeEach(() => {
        angular.mock.module('profitelo.controller.dashboard.settings.payments')
        angular.mock.module('ui.router')
        inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService,
                _AccountApiMock_: AccountApiMock, _$state_: ng.ui.IStateService,
                $httpBackend: ng.IHttpBackendService) => {
          dashboardSettingsPaymentsController =
            $controller(DashboardSettingsPaymentsController, {
            $state: _$state_,
            $scope: $rootScope.$new(),
            user: {},
            getInvoiceData: {
              companyInfo: {
                companyName: 'asasas',
                address: {
                  street: 'sdasd'
                }
              }},
            modalsService: {}
          })
          AccountApiMock = _AccountApiMock_
          httpBackend = $httpBackend
        })
      })

      it('should exists', () => {
        expect(!!dashboardSettingsPaymentsController).toBe(true)
      })

    })
  })
