import * as angular from 'angular';
import { CommunicatorService } from '@anymind-ng/core';
import { IMessengerComponentBindings, default as messengerModule } from './messenger';
import soundsModule from '../../../services/sounds/sounds';
import { MessengerComponentController } from './messenger.controller';
import { EMPTY } from 'rxjs';
import loggerMockModule from '../../../services/logger/logger.mock';

describe('Unit testing: profitelo.components.communicator.messenger', () =>
  describe('for messenger component >', () => {

    let rootScope: ng.IRootScopeService;
    let compile: ng.ICompileService;
    let component: MessengerComponentController;

    const expertCallService = {
      newCall$: EMPTY
    };

    const validHTML =
      '<messenger call-length="callLength" call-cost="callCost" is-messenger="isMessenger"></messenger>';

    const bindings: IMessengerComponentBindings = {
      isMessenger: false
    };

    const communicatorService: CommunicatorService = <any>{
      onActiveCall: (): void => {},
      connectionEstablishedEvent$: EMPTY,
      connectionLostEvent$: EMPTY
    };

    function create(html: string, bindings: IMessengerComponentBindings): JQuery {
      const parentScope = rootScope.$new();
      const parentBoundScope = angular.extend(parentScope, bindings);
      const elem = angular.element(html);
      const compiledElement = compile(elem)(parentBoundScope);
      parentBoundScope.$digest();
      return compiledElement;
    }

    beforeEach(() => {
      angular.mock.module(soundsModule);
      angular.mock.module(messengerModule);
      angular.mock.module(loggerMockModule);
    });

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('soundsService', {});
      $provide.value('apiUrl', 'awesomeUrl/');
      $provide.value('communicatorService', communicatorService);
      $provide.value('expertCallService', expertCallService);
    }));

    beforeEach(() => {

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope;
        compile = $compile;

        const injectors = {};

        component = $componentController<MessengerComponentController, IMessengerComponentBindings>(
          'messenger', injectors, bindings);
      });
    });

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy();
    }));

    it('should compile the component', () => {
      const el = create(validHTML, bindings);
      expect(el.html()).toBeDefined(true);
    });

    it('should minimizeMessenger', () => {
      component.minimizeMessenger();
      expect(component.isMessenger).toBe(false);
    });

    it('should maximizeMessenger', () => {
      component.maximizeMessenger();
      expect(component.isMessenger).toBe(true);
    });
  }));
