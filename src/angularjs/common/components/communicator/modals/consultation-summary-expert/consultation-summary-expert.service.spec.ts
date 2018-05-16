import * as angular from 'angular';
import consultationSummaryExpertControllerModule from './consultation-summary-expert';
import { ConsultationSummaryExpertService } from './consultation-summary-expert.service';
import loggerMockModule from '../../../../services/logger/logger.mock';
import { ServiceUsageEventApi } from 'profitelo-api-ng/api/ServiceUsageEventApi';

describe('Unit testing: profitelo.components.communicator.modals.consultation-summary-expert >', () => {
  describe('for profitelo.components.communicator.modals.consultation-summary-expert', () => {

    let consultationSummaryExpertService: ConsultationSummaryExpertService;
    let rootScope: angular.IRootScopeService;

    beforeEach(() => {
      angular.mock.module(consultationSummaryExpertControllerModule);
      angular.mock.module(loggerMockModule);
    });

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl');
      $provide.value('normalizeTranslationKeyFilter', (x: string) => x);
      $provide.value('serviceUsageEventApi', ServiceUsageEventApi);
    }));

    beforeEach(inject(($injector: ng.auto.IInjectorService, $rootScope: angular.IRootScopeService) => {
      consultationSummaryExpertService =
        $injector.get<ConsultationSummaryExpertService>('consultationSummaryExpertService');
      rootScope = $rootScope;
    }));

    it('should have a dummy test', () => {
      expect(true).toBeTruthy();
    });

  });
});
