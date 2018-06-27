import * as angular from 'angular';
import toggleClassOnPullCall from './toggle-class-on-pull-call';
import { EMPTY } from 'rxjs';
import { EventsService } from '../../services/events/events.service';
import { IRootScopeService } from '../../services/root-scope/root-scope.service';
import loggerMockModule from '../../services/logger/logger.mock';
import communicatorMockModule from '../../components/communicator/communicator.mock';

describe('Unit testing: profitelo.directives.toggle-class-on-pull-call', () =>
  describe('for toggle-class-on-pull-call directive >', () => {

    let compile: ng.ICompileService;
    let scope: ng.IScope;
    const validHTML = '<div toggle-class-on-pull-call="is-active"></div>';

    const expertCallService: any = {
      newCall$: EMPTY
    };

    const eventsService: EventsService = <any>{
      on: (_event: string, _callback: () => {}) => {}
    };

    const activeCallBarServiceMock = {
      showCallBar$: EMPTY,
      hideCallBar$: EMPTY
    };

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('expertCallService', expertCallService);
      $provide.value('eventsService', eventsService);
      $provide.value('activeCallBarService', activeCallBarServiceMock);
    }));

    beforeEach(() => {
      angular.mock.module(communicatorMockModule);
      angular.mock.module(toggleClassOnPullCall);
      angular.mock.module(loggerMockModule);

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService) => {
        scope = $rootScope.$new();
        compile = $compile;
      });
    });

    function create(): JQuery {
      const elem = angular.element(validHTML);
      const compiledElement = compile(elem)(scope);
      scope.$digest();
      return compiledElement;
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy();
    }));

    it('should compile the directive', () => {
      const el = create();
      expect(el.html()).toBeDefined(true);
    });
  }));
