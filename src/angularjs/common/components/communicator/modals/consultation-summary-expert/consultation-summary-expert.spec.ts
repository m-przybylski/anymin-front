import * as angular from 'angular';

import { ViewsApi, ViewsApiMock } from 'profitelo-api-ng/api/api';
import {
  ConsultationSummaryExpertController,
  IConsultationSummaryExpertControllerScope
} from './consultation-summary-expert.controller';
import { GetTechnicalProblem } from 'profitelo-api-ng/model/models';
import consultationSummaryExpertModule from './consultation-summary-expert';
import { ErrorHandlerService } from '../../../../services/error-handler/error-handler.service';
import { httpCodes } from '../../../../classes/http-codes';
import { TopAlertService } from '../../../../services/top-alert/top-alert.service';
import { ConsultationSummaryExpertService } from './consultation-summary-expert.service';
import SpyObj = jasmine.SpyObj;
import loggerMockModule from '../../../../services/logger/logger.mock';
import { ServiceUsageEventApi, ServiceUsageEventApiMock } from 'profitelo-api-ng/api/ServiceUsageEventApi';

describe('Testing Controller: consultationSummaryExpertController', () => {

  let consultationSummaryExpertController: ConsultationSummaryExpertController;
  let scope: IConsultationSummaryExpertControllerScope;
  let serviceUsageEventApiMock: ServiceUsageEventApiMock;
  let errorHandler: ErrorHandlerService;
  let $httpBackend: ng.IHttpBackendService;
  let topAlertService: TopAlertService;

  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

  const consultationSummaryExpertService: SpyObj<ConsultationSummaryExpertService> =
    jasmine.createSpyObj<ConsultationSummaryExpertService>('consultationSummaryExpertService', [
      'sendTechnicalProblems', 'complaintReasons'
    ]);

  beforeEach(() => {
    angular.mock.module(consultationSummaryExpertModule);
    angular.mock.module(loggerMockModule);
  });

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL');
    $provide.value('normalizeTranslationKeyFilter', (x: string) => x);
    $provide.value('ServiceUsageEventApi', ServiceUsageEventApi);
  }));

  beforeEach(() => {
    inject(($rootScope: any,
            $controller: ng.IControllerService,
            _$httpBackend_: ng.IHttpBackendService,
            _ViewsApi_: ViewsApi,
            ViewsApiMock: ViewsApiMock,
            _ServiceUsageEventApiMock_: ServiceUsageEventApiMock,
            _errorHandler_: ErrorHandlerService,
            _topAlertService_: TopAlertService) => {

      scope = <IConsultationSummaryExpertControllerScope>$rootScope.$new();
      scope.serviceUsageEventId = '123';
      serviceUsageEventApiMock = _ServiceUsageEventApiMock_;
      errorHandler = _errorHandler_;
      $httpBackend = _$httpBackend_;
      topAlertService = _topAlertService_;

      consultationSummaryExpertController =
        $controller<ConsultationSummaryExpertController>('consultationSummaryExpertController', {
          $scope: scope,
          $uibModalInstance,
          httpBackend: _$httpBackend_,
          ViewsApi: _ViewsApi_,
          consultationSummaryExpertService
        });

      ViewsApiMock.getExpertCallSummaryRoute(404, '123');
    });
  });

  it('should exists', () => {
    expect(!!consultationSummaryExpertController).toBe(true);
  });

  it('should uibModalInstance', () => {
    consultationSummaryExpertController.onModalClose();
    expect($uibModalInstance.dismiss).toHaveBeenCalled();
  });

  it('should client report message be valid', () => {
    consultationSummaryExpertController.clientReportMessage = 'message';
    expect(consultationSummaryExpertController.isClientReportValid()).toEqual(true);
  });

  it('should invoke send report function if report message is valid', () => {
    spyOn(consultationSummaryExpertController, 'sendClientReport');
    consultationSummaryExpertController.clientReportMessage = 'message';
    consultationSummaryExpertController.onSendClientReportClick();
    expect(consultationSummaryExpertController.sendClientReport).toHaveBeenCalled();
  });

  it('should show success alert when send technical problems',
    inject(($q: ng.IQService, $controller: ng.IControllerService) => {
      spyOn(topAlertService, 'success');
      serviceUsageEventApiMock.postTechnicalProblemRoute(httpCodes.ok, 'sueId', GetTechnicalProblem.ProblemTypeEnum.CHATPROBLEM);
      consultationSummaryExpertService.sendTechnicalProblems.and.callFake(() => $q.resolve({}));
      consultationSummaryExpertController =
        $controller<ConsultationSummaryExpertController>('consultationSummaryExpertController', {
          $scope: scope,
          $uibModalInstance,
          consultationSummaryExpertService
        });
      consultationSummaryExpertController.radioModel = GetTechnicalProblem.ProblemTypeEnum.CHATPROBLEM;
      consultationSummaryExpertController.onSendTechnicalProblems();
      scope.$apply();
      expect(topAlertService.success).toHaveBeenCalled();
    }));

  it('should show error when send technical problems fails',
    inject(($q: ng.IQService, $controller: ng.IControllerService) => {
      spyOn(errorHandler, 'handleServerError');
      serviceUsageEventApiMock.postTechnicalProblemRoute(httpCodes.ok, 'sueId', GetTechnicalProblem.ProblemTypeEnum.CHATPROBLEM);
      consultationSummaryExpertService.sendTechnicalProblems.and.callFake(() => $q.reject({}));
      consultationSummaryExpertController =
        $controller<ConsultationSummaryExpertController>('consultationSummaryExpertController', {
          $scope: scope,
          $uibModalInstance,
          consultationSummaryExpertService
        });
      consultationSummaryExpertController.radioModel = GetTechnicalProblem.ProblemTypeEnum.CHATPROBLEM;
      consultationSummaryExpertController.onSendTechnicalProblems();
      scope.$apply();
      expect(errorHandler.handleServerError).toHaveBeenCalled();
    }));

  it('should valid send technical problem form',
    inject(($controller: ng.IControllerService) => {
      const consultationSummaryExpertService = {
          complaintReasons: [
            {
              id: GetTechnicalProblem.ProblemTypeEnum.IMAGEORSOUNDPROBLEM,
              isDescriptionRequired: false,
              name: 'complaintForm',
              label: 'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.IMAGE_OR_SOUND_PROBLEM'
            },
            {
              id: GetTechnicalProblem.ProblemTypeEnum.OTHER,
              isDescriptionRequired: true,
              name: 'complaintForm',
              label: 'COMMUNICATOR.MODALS.CONSULTATION_SUMMARY_EXPERT.OTHER'
            }
          ]
        };
      consultationSummaryExpertController =
        $controller<ConsultationSummaryExpertController>('consultationSummaryExpertController', {
          $scope: scope,
          $uibModalInstance,
          consultationSummaryExpertService
        });
      consultationSummaryExpertController.radioModel = GetTechnicalProblem.ProblemTypeEnum.CHATPROBLEM;
      expect(consultationSummaryExpertController.isTechnicalProblemsFormValid()).toBe(true);
    }));

});
