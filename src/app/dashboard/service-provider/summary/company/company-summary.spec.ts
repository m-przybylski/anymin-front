import * as angular from "angular"
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {ServiceApi, ServiceApiMock} from "profitelo-api-ng/api/api"
import {TopAlertService} from "../../../../../common/services/top-alert/top-alert.service"
import {Profile} from "../../../../../common/models/Profile"
import communicatorModule from "../../../../../common/components/communicator/communicator"
import "./company-summary"

describe('Unit tests: CompanySummaryController >', () => {
  describe('Testing Controller: CompanySummaryController', () => {

    let CompanySummaryController: any
    let _scope: any
    let _state: ng.ui.IStateService
    let _ServiceApiMock: ServiceApiMock
    let _httpBackend: ng.IHttpBackendService
    let _topAlertService: TopAlertService
    let _ServiceApi: ServiceApi
    let _controller: any

    let url = 'awesomeUrl/'

    function createController(controller: any, savedProfile: Profile, profileAvatar: string, companyLogo: string) {
      CompanySummaryController = controller('CompanySummaryController', {
        $scope: _scope,
        ServiceApi: _ServiceApi,
        savedProfile: savedProfile,
        $state: _state,
        profileAvatar: profileAvatar,
        companyLogo: companyLogo,
        topAlertService: _topAlertService
      })
    }

    const communicatorService = {
      authenticate: () => {
      }
    }

    beforeEach(() => {
      angular.mock.module(communicatorModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', url)
      $provide.value('communicatorService', communicatorService)
    }))

    beforeEach(() => {
      //angular.mock.module('templates-module')
      angular.mock.module('profitelo.controller.dashboard.service-provider.summary.company')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $httpBackend: ng.IHttpBackendService,
              $injector: ng.auto.IInjectorService, _$state_: ng.ui.IStateService, _ServiceApi_: ServiceApi,
              _topAlertService_: TopAlertService) => {

        _scope = $rootScope.$new()
        _state = _$state_
        _httpBackend = $httpBackend
        _topAlertService = _topAlertService_
        _ServiceApi = _ServiceApi_
        _controller = $controller

        createController(_controller, <any>{
          expertDetails: {
            d: 1
          },
          organizationDetails: {}
        }, '', '')

        _ServiceApiMock = $injector.get<ServiceApiMock>('ServiceApiMock')
      })
    })

    it('should exists', () => {
      return expect(!!CompanySummaryController).toBe(true)
    })

    it('should delete requested consultation', () => {

      createController(_controller, <any>{
        expertDetails: {
          id: 1
        },
        organizationDetails: undefined
      }, '', '')

      _ServiceApiMock.deleteServiceRoute(200, '1')

      CompanySummaryController.consultations = [{name: '121'}]

      CompanySummaryController.deleteConsultation(':serviceId', 1)

    })

    it('should fail on delete requested consultation error', () => {

      _ServiceApiMock.deleteServiceRoute(500, '1')

      CompanySummaryController.consultations = []

      CompanySummaryController.deleteConsultation(':serviceId', 1)

    })

    it('should transfer to first company step', () => {

      spyOn(_state, 'go')

      CompanySummaryController.backToFirstStep()

      expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.company-path')

    })

    it('should transfer to first individual step ', () => {

      spyOn(_state, 'go')

      CompanySummaryController.goToExpertEdit()

      expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.individual-path')

    })

  })
})
