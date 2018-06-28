import * as angular from 'angular';
import { ActiveCallBarService } from './active-call-bar.service';
import activeCallBarModule from './active-call-bar';
import loggerMockModule from '../../../services/logger/logger.mock';
import communicatorMockModule from '../communicator.mock';
import { EMPTY } from 'rxjs';

describe('Unit testing: profitelo.components.communicator.active-call-bar >', () => {
  describe('for active-call-bar service >', () => {

    const expertCallService: any = {
      pullableCall$: EMPTY
    };

    const eventsService = {
      on: (_event: string, callback: () => void) => callback()
    };
    let activeCallBarService: ActiveCallBarService;

    beforeEach(() => {
      angular.mock.module(activeCallBarModule);
      angular.mock.module(loggerMockModule);
      angular.mock.module(communicatorMockModule);
    });

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('expertCallService', expertCallService);
      $provide.value('eventsService', eventsService);
    }));

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      activeCallBarService = $injector.get<ActiveCallBarService>('activeCallBarService');
    }));

    it('should have a dummy test', () => {
      expect(true).toBeTruthy();
    });
  });
});
