import * as angular from 'angular';
import { IMessengerMinimizedComponentBindings } from './minimized';
import { MessengerMinimizedComponentController } from './minimized.controller';
import communicatorModule from '../../communicator';
import { EMPTY } from 'rxjs';

describe('Unit testing: profitelo.components.communicator.messenger.minimized', () =>
  describe('for messengerMinimized component >', () => {
    let rootScope: ng.IRootScopeService;
    let compile: ng.ICompileService;
    let component: MessengerMinimizedComponentController;

    const bindings: IMessengerMinimizedComponentBindings = {
      onMessageClick: (): void => {},
    };

    // tslint:disable-next-line:no-object-literal-type-assertion
    const expertCallService: any = {
      newCall$: EMPTY,
      pullableCall$: EMPTY,
    };

    beforeEach(() => {
      angular.mock.module(communicatorModule);
    });

    beforeEach(
      angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeURL');
        $provide.value('expertCallService', expertCallService);
      }),
    );

    beforeEach(() => {
      angular.mock.module('profitelo.components.communicator.messenger.minimized');

      inject(
        (
          $rootScope: ng.IRootScopeService,
          $compile: ng.ICompileService,
          $timeout: ng.ITimeoutService,
          $componentController: ng.IComponentControllerService,
        ) => {
          rootScope = $rootScope;
          compile = $compile;

          const injectors = {
            $$timeout: $timeout,
            expertCallService,
          };

          component = $componentController<MessengerMinimizedComponentController, IMessengerMinimizedComponentBindings>(
            'messengerMinimized',
            injectors,
            bindings,
          );
        },
      );
    });

    it('should have a dummy test', inject(() => {
      expect(component).toBeTruthy();
    }));
  }));
