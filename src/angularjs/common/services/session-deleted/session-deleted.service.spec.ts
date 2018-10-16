import * as angular from 'angular';
import sessionDeletedModule from './session-deleted';
import { SessionDeletedService } from './session-deleted.service';
import { EventsService } from '../events/events.service';
import { SessionServiceWrapper } from '../session/session.service';
import { AnymindWebsocketService } from '@platform/core/services/anymind-websocket/anymind-websocket.service';

describe('Unit testing: profitelo.services.sessionDeletedService >', () => {
  describe('for profitelo.services.sessionDeletedService >', () => {
    const anymindWebsocket = jasmine.createSpyObj<AnymindWebsocketService>('anymindWebsocket', ['sessionDeleted']);
    const sessionServiceWrapper = jasmine.createSpyObj<SessionServiceWrapper>('sessionService', [
      'getSession',
      'onSuccessLogout',
    ]);
    const eventsService = jasmine.createSpyObj<EventsService>('eventsService', ['emit']);
    let sessionDeletedService: SessionDeletedService;
    beforeEach(() => {
      angular.mock.module(sessionDeletedModule);
    });

    beforeEach(
      angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('anymindWebsocket', anymindWebsocket);
        $provide.value('sessionServiceWrapper', sessionServiceWrapper);
        $provide.value('eventsService', eventsService);
      }),
    );

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      sessionDeletedService = $injector.get<SessionDeletedService>('sessionDeletedService');
    }));

    it('should have a dummy test', () => {
      expect(sessionDeletedService).toBeTruthy();
    });
  });
});
