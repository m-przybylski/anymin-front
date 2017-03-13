import * as angular from "angular"
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {ServiceApi, ServiceApiMock} from "../../../../../common/api/api/ServiceApi"
import {TopAlertService} from "../../../../../common/services/top-alert/top-alert.service"
import {Profile} from "../../../../../common/models/Profile"
import communicatorModule from "../../../../../common/components/communicator/communicator"
import "./individual-summary"

describe('Unit tests: IndividualSummaryController >', () => {
  describe('Testing Controller: IndividualSummaryController', () => {

    let IndividualSummaryController: any
    let _scope: any
    let _state: ng.ui.IStateService
    let _ServiceApiMock: ServiceApiMock
    let _httpBackend: ng.IHttpBackendService
    let _topAlertService: TopAlertService
    let _ServiceApi: ServiceApi
    let _controller: any

    let url = 'awesomeUrl/'

    function createController(controller: any, savedProfile: Profile, profileImage: string) {
      IndividualSummaryController = controller('IndividualSummaryController', {
        $scope: _scope,
        ServiceApi: _ServiceApi,
        savedProfile: savedProfile,
        $state: _state,
        profileImage: profileImage,
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

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
      $provide.value('communicatorService', communicatorService)
    }))

    beforeEach(() => {
      ////angular.mock.module('templates-module')
      angular.mock.module('profitelo.controller.dashboard.service-provider.summary.individual')
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
            id: 1
          },
          organizationDetails: null
        }, '')

        _ServiceApiMock = $injector.get<ServiceApiMock>('ServiceApiMock')
      })
    })

    it('should exists', () => {
      return expect(!!IndividualSummaryController).toBe(true)
    })

    it('should delete requested consultation', () => {
      _ServiceApiMock.deleteServiceRoute(200, '1')

      IndividualSummaryController.consultations = [{name: '123'}]

      IndividualSummaryController.deleteConsultation(':serviceId', 1)

    })

    it('should fail on delete requested consultation error', () => {

      _ServiceApiMock.deleteServiceRoute(500, '1')

      IndividualSummaryController.consultations = []

      IndividualSummaryController.deleteConsultation(':serviceId', 1)

    })

  })
})
