import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {DialogService} from '../../../../../common/services/dialog/dialog.service'
import {ServiceApi, ServiceApiMock} from 'profitelo-api-ng/api/api'
import {GetService} from 'profitelo-api-ng/model/models'
import {TopAlertService} from '../../../../../common/services/top-alert/top-alert.service'
import './company-consultation'

describe('Unit tests: app.dashboard.service-provider.consultation-range.company >', () => {
  describe('Testing Controller: CompanyConsultationController', () => {

    let CompanyConsultationController: any
    let _scope: any
    let url = 'awesomeUrl'
    let _state: ng.ui.IStateService
    let _ServiceApiMock: ServiceApiMock
    let _httpBackend: ng.IHttpBackendService
    let _topAlertService: TopAlertService
    let _ServiceApi: ServiceApi
    let _dialogService: DialogService
    let _controller: any

    function createController(controller: any, savedProfile: any, profileImage: any) {
      CompanyConsultationController = controller('CompanyConsultationController', {
        $scope: _scope,
        ServiceApi: _ServiceApi,
        savedProfile: savedProfile,
        profileImage: profileImage,
        $state: _state,
        topAlertService: _topAlertService
      })
    }

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {

      angular.mock.module('profitelo.controller.dashboard.service-provider.consultation-range.company')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $httpBackend: ng.IHttpBackendService,
              $injector: ng.auto.IInjectorService, _$state_: ng.ui.IStateService, _ServiceApi_: ServiceApi,
              _topAlertService_: TopAlertService, _dialogService_: DialogService) => {

        _scope = $rootScope.$new()
        _state = _$state_
        _httpBackend = $httpBackend
        _topAlertService = _topAlertService_
        _ServiceApi = _ServiceApi_
        _controller = $controller
        _dialogService = _dialogService_

        createController(_controller, {
          expertDetails: {
            d: 1
          },
          organizationDetails: null
        }, null)

        _ServiceApiMock = $injector.get<ServiceApiMock>('ServiceApiMock')

      })
    })

    it('should exists', () => {
      return expect(!!CompanyConsultationController).toBe(true)
    })

    it('should be able to save conslultation', inject(($rootScope: ng.IRootScopeService) => {

      //FIXME
      _ServiceApiMock.postServiceRoute(200, <GetService>{})

      spyOn(_state, 'reload')

      CompanyConsultationController.addAnotherConsultation()
      _httpBackend.flush()
      $rootScope.$digest()

      expect(_state.reload).toHaveBeenCalled()

    }))

    it('should alert on save conslultation fail', () => {

      _ServiceApiMock.postServiceRoute(500)

      spyOn(_topAlertService, 'error')

      CompanyConsultationController.addAnotherConsultation()
      _httpBackend.flush()

      expect(_topAlertService.error).toHaveBeenCalledWith({message: 'error', timeout: 4})

    })

    it('should transfer to first individual step based on creator type', () => {

      spyOn(_state, 'go')

      CompanyConsultationController.backToFirstStep()

      expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.individual-path')

    })

    it('should transfer to first company step based on creator type', () => {

      spyOn(_state, 'go')

      createController(_controller, {
        expertDetails: null,
        organizationDetails: null
      }, null)

      CompanyConsultationController.backToFirstStep()

      expect(_state.go).toHaveBeenCalledWith('app.dashboard.service-provider.company-path')

    })

    it('should delete requested consultation', () => {

      _ServiceApiMock.deleteServiceRoute(200, ':serviceId')

      CompanyConsultationController.consultations = []

      CompanyConsultationController.deleteConsultation(':serviceId', 1)

    })

    it('should fail on delete requested consultation error', () => {

      _ServiceApiMock.deleteServiceRoute(500, ':serviceId')

      spyOn(_dialogService, 'openDialog')

      CompanyConsultationController.consultations = []

      CompanyConsultationController.deleteConsultation(':serviceId', 1)

    })

  })
})
