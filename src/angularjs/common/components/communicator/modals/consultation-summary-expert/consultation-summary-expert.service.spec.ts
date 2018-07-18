import * as angular from 'angular';
import { ServiceUsageEventApiMock } from 'profitelo-api-ng/api/api';
import { httpCodes } from '../../../../classes/http-codes';
import { GetTechnicalProblem } from 'profitelo-api-ng/model/models';
import consultationSummaryExpertControllerModule from './consultation-summary-expert';
import { ConsultationSummaryExpertService } from './consultation-summary-expert.service';
import loggerMockModule from '../../../../services/logger/logger.mock';

describe('Unit testing: profitelo.components.communicator.modals.consultation-summary-expert >', () => {
  describe('for profitelo.components.communicator.modals.consultation-summary-expert', () => {

    const sueId = '194b2e05-dca5-400e-b292-75a7ffbcefac'
    let consultationSummaryExpertService: ConsultationSummaryExpertService;
    let rootScope: angular.IRootScopeService;

    beforeEach(() => {
      angular.mock.module(consultationSummaryExpertControllerModule);
      angular.mock.module(loggerMockModule);
    });

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl');
      $provide.value('normalizeTranslationKeyFilter', (x: string) => x);
    }));

    beforeEach(inject(($injector: ng.auto.IInjectorService, $rootScope: angular.IRootScopeService) => {
      consultationSummaryExpertService =
        $injector.get<ConsultationSummaryExpertService>('consultationSummaryExpertService');
      rootScope = $rootScope;
    }));

    it('should have a dummy test', () => {
      expect(true).toBeTruthy();
    });

    it('should send technical problem if promise was reject', (done) => {
      inject((ServiceUsageEventApiMock: ServiceUsageEventApiMock, $httpBackend: ng.IHttpBackendService) => {
        const problemType = GetTechnicalProblem.ProblemTypeEnum.AUTODISCONNECT
        ServiceUsageEventApiMock.postTechnicalProblemRoute(httpCodes.notFound, sueId, problemType)

        consultationSummaryExpertService.sendTechnicalProblems(sueId, problemType).catch((error) => {
          expect(error.status).toEqual(httpCodes.notFound)
          done()
        })
        $httpBackend.flush()
      })
    })

    it('should send technical problem without description', (done) => {
      inject((ServiceUsageEventApiMock: ServiceUsageEventApiMock, $httpBackend: ng.IHttpBackendService) => {
        const problemType = GetTechnicalProblem.ProblemTypeEnum.AUTODISCONNECT
        ServiceUsageEventApiMock.postTechnicalProblemRoute(httpCodes.noContent, sueId, problemType)

        consultationSummaryExpertService.sendTechnicalProblems(sueId, problemType).then((response) => {
          expect(response).toEqual(problemType)
          done()
        })
        $httpBackend.flush()
      })
    })

    it('should send technical problem with description', (done) => {
      inject((ServiceUsageEventApiMock: ServiceUsageEventApiMock, $httpBackend: ng.IHttpBackendService) => {
        const description = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        const problemType = GetTechnicalProblem.ProblemTypeEnum.OTHER
        ServiceUsageEventApiMock.postTechnicalProblemRoute(httpCodes.noContent, sueId, {problemType, description})

        consultationSummaryExpertService.sendTechnicalProblems(sueId, problemType, description).then((response) => {
          expect(response).toEqual({problemType, description})
          done()
        })
        $httpBackend.flush()
      })
    })
  })
})
