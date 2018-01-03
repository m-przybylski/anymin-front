import * as angular from 'angular'

import {ViewsApi, ServiceApiMock} from 'profitelo-api-ng/api/api'
import {
  ConsultationSummaryExpertController,
  IConsultationSummaryExpertControllerScope
} from './consultation-summary-expert.controller'
import consultationSummaryExpertModule from './consultation-summary-expert'
import {ErrorHandlerService} from '../../../../services/error-handler/error-handler.service'
import {httpCodes} from '../../../../classes/http-codes'
import {TopAlertService} from '../../../../services/top-alert/top-alert.service'
import {ConsultationSummaryExpertService} from './consultation-summary-expert.service'
import SpyObj = jasmine.SpyObj

describe('Testing Controller: consultationSummaryExpertController', () => {

  let consultationSummaryExpertController: ConsultationSummaryExpertController
  let scope: IConsultationSummaryExpertControllerScope
  let serviceApiMock: ServiceApiMock
  let errorHandler: ErrorHandlerService
  let $httpBackend: ng.IHttpBackendService
  let topAlertService: TopAlertService

  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

  const consultationSummaryExpertService: SpyObj<ConsultationSummaryExpertService> =
    jasmine.createSpyObj<ConsultationSummaryExpertService>('consultationSummaryExpertService', [
      'sendTechnicalProblems'
    ])

  beforeEach(() => {
    angular.mock.module(consultationSummaryExpertModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
    $provide.value('normalizeTranslationKeyFilter', (x: string) => x)
  }))

  beforeEach(() => {inject(($rootScope: any,
            $controller: ng.IControllerService,
            _$httpBackend_: ng.IHttpBackendService,
            _ViewsApi_: ViewsApi,
            _ServiceApiMock_: ServiceApiMock,
            _errorHandler_: ErrorHandlerService,
            _topAlertService_: TopAlertService) => {

      scope = <IConsultationSummaryExpertControllerScope>$rootScope.$new()
      scope.serviceId = '123'
      serviceApiMock = _ServiceApiMock_
      errorHandler = _errorHandler_
      $httpBackend = _$httpBackend_
      topAlertService = _topAlertService_

      consultationSummaryExpertController =
        $controller<ConsultationSummaryExpertController>('consultationSummaryExpertController', {
        $scope: scope,
        $uibModalInstance,
        httpBackend: _$httpBackend_,
        ViewsApi: _ViewsApi_,
        consultationSummaryExpertService
      })
    })
  })

  it('should exists', () => {
    expect(!!consultationSummaryExpertController).toBe(true)
  })

  it('should uibModalInstance', () => {
    consultationSummaryExpertController.onModalClose()
    expect($uibModalInstance.dismiss).toHaveBeenCalled()
  })

  it('should client report message be valid', () => {
    consultationSummaryExpertController.clientReportMessage = 'message'
    expect(consultationSummaryExpertController.isClientReportValid()).toEqual(true)
  })

  it('should send client report', () => {
    spyOn(topAlertService, 'success')
    serviceApiMock.postExpertComplaintRoute(httpCodes.ok, 'sueId', {})
    consultationSummaryExpertController.sendClientReport('sueId', 'message')
    $httpBackend.flush()
    expect(topAlertService.success).toHaveBeenCalled()
  })

  it('should show error when send client report failed', () => {
    spyOn(errorHandler, 'handleServerError')
    serviceApiMock.postExpertComplaintRoute(httpCodes.notFound, 'sueId')
    consultationSummaryExpertController.sendClientReport('sueId', 'message')
    $httpBackend.flush()
    expect(errorHandler.handleServerError).toHaveBeenCalled()
  })

  it('should invoke send report function if report message is valid', () => {
    spyOn(consultationSummaryExpertController, 'sendClientReport')
    consultationSummaryExpertController.clientReportMessage = 'message'
    consultationSummaryExpertController.onSendClientReportClick()
    expect(consultationSummaryExpertController.sendClientReport).toHaveBeenCalled()
  })

})
