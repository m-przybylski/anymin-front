import * as angular from 'angular';
import { ChatHistoryComponentController } from './chat-history.controller';
import { IChatHistoryBindings } from './chat-history';
import chatHistoryModule from './chat-history';
import { of } from 'rxjs';

describe('Unit testing: profitelo.components.chat-history', () => {
  return describe('for chatHistory component >', () => {
    let rootScope: ng.IRootScopeService;
    let compile: ng.ICompileService;
    let component: ChatHistoryComponentController;

    const validHTML = '<chat-history></chat-history>';

    const bindings: IChatHistoryBindings = {
      roomId: '',
    };
    let q: ng.IQService;
    let log: ng.ILogService;

    const communicatorService = {
      connectionEstablishedEvent$: of({}),
    };

    function create(html: string, bindings: IChatHistoryBindings): JQuery {
      const parentScope: ng.IScope = rootScope.$new();
      const parentBoundScope = angular.extend(parentScope, bindings);
      const elem = angular.element(html);
      const compiledElement = compile(elem)(parentBoundScope);
      parentBoundScope.$digest();
      return compiledElement;
    }

    beforeEach(() => {
      angular.mock.module(chatHistoryModule);
    });

    beforeEach(
      angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeURL');
        $provide.value('communicatorService', communicatorService);
      }),
    );

    beforeEach(() => {
      inject(
        (
          $rootScope: ng.IRootScopeService,
          $compile: ng.ICompileService,
          $log: ng.ILogService,
          $q: ng.IQService,
          $componentController: ng.IComponentControllerService,
        ) => {
          rootScope = $rootScope.$new();
          compile = $compile;
          log = $log;
          q = $q;

          const injectors = {
            $log: log,
            communicatorService: communicatorService,
          };

          component = $componentController<ChatHistoryComponentController, IChatHistoryBindings>(
            'chatHistory',
            injectors,
            bindings,
          );
        },
      );
    });

    it('should have a dummy test', () => {
      expect(true).toBeTruthy();
    });

    it('should compile the component', () => {
      const el = create(validHTML, bindings);
      expect(el.html()).toBeDefined(true);
    });

    it('should not get messages ', () => {
      spyOn(log, 'error');
      component.getMessages();
      expect(log.error).toHaveBeenCalled();
    });
  });
});
