import * as angular from 'angular';

import './navigation';
import communicatorModule from '../communicator';
import navigationModule from './navigation';
import { INavigationComponentBindings, NavigationComponentController } from './navigation.controller';
import { EMPTY } from 'rxjs';
import loggerMockModule from '../../../services/logger/logger.mock';

describe('Unit testing: profitelo.components.communicator.navigation', () =>
  describe('for communicatorNav component >', () => {

    let rootScope: ng.IRootScopeService;
    let compile: ng.ICompileService;
    let component: NavigationComponentController;

    const validHTML = '<communicator-nav is-video="isVideo" is-messenger="isMessenger"></communicator-nav>';

    const currentCall: any = {
      mute: (): void => {},
      unmute: (): void => {},
      startVideo: (): void => {},
      stopVideo: (): void => {},
      changeCamera: (): void => {}
    };

    const bindings: INavigationComponentBindings = {
      isMessenger: false,
      isVideo: false
    };

    const expertCallService: any = {
      newCall$: EMPTY
    };

    beforeEach(() => {
      angular.mock.module(communicatorModule);
      angular.mock.module(loggerMockModule);
    });

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/');
      $provide.value('normalizeTranslationKeyFilter', (x: string) => x);
      $provide.value('expertCallService', expertCallService);
    }));

    beforeEach(() => {

      angular.mock.module(navigationModule);

      inject(($rootScope: any, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope.$new();
        compile = $compile;

        const injectors = {
          expertCallService
        };

        component = $componentController<NavigationComponentController, INavigationComponentBindings>(
          'communicatorNav', injectors, bindings
        );
      });
    });

    function create(html: string, bindings: INavigationComponentBindings): JQuery {
      const parentScope: ng.IScope = rootScope.$new();
      const parentBoundScope = angular.extend(parentScope, bindings);
      const elem: JQuery = angular.element(html);
      const compiledElement: JQuery = compile(elem)(parentBoundScope);
      parentBoundScope.$digest();
      return compiledElement;
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy();
    }));

    it('should compile the component', () => {
      const el: JQuery = create(validHTML, bindings);
      expect(el.html()).toBeDefined(true);
    });

    it('should animateButtons true', () => {
      const event = {
        currentTarget: {
          classList: {
            contains: (): boolean => true,
            add: (): void => {
            },
            remove: (): void => {
            }
          }
        }
      };
      spyOn(event.currentTarget.classList, 'contains').and.returnValue(true);
      spyOn(event.currentTarget.classList, 'add');
      spyOn(event.currentTarget.classList, 'remove');
      component.animateButtons(event);
      expect(event.currentTarget.classList.contains).toHaveBeenCalled();
      expect(event.currentTarget.classList.add).toHaveBeenCalled();
      expect(event.currentTarget.classList.remove).toHaveBeenCalled();
    });

    it('should animateButtons false', () => {
      const event = {
        currentTarget: {
          classList: {
            contains: (): boolean => false,
            add: (): void => {
            },
            remove: (): void => {
            }
          }
        }
      };
      spyOn(event.currentTarget.classList, 'contains').and.returnValue(false);
      spyOn(event.currentTarget.classList, 'add');
      spyOn(event.currentTarget.classList, 'remove');
      component.animateButtons(event);
      expect(event.currentTarget.classList.contains).toHaveBeenCalled();
      expect(event.currentTarget.classList.add).toHaveBeenCalled();
      expect(event.currentTarget.classList.remove).toHaveBeenCalled();
    });

    it('should startAudio', inject(() => {
      component.currentCall = currentCall;
      component.isAudio = false;
      spyOn(currentCall, 'unmute');
      component.startAudio();
      expect(currentCall.unmute).toHaveBeenCalled();
    }));

    it('should stopAudio', inject(() => {
      component.currentCall = currentCall;
      component.isAudio = true;
      spyOn(currentCall, 'mute');
      component.stopAudio();
      expect(currentCall.mute).toHaveBeenCalled();
    }));

    it('should startVideo', inject(($q: ng.IQService) => {
      component.currentCall = currentCall;
      spyOn(currentCall, 'startVideo').and.returnValue($q.resolve());
      spyOn(component, 'animateButtons');
      component.startVideo({} as Element);
      expect(component.animateButtons).toHaveBeenCalled();
      expect(currentCall.startVideo).toHaveBeenCalled();
    }));

    it('should changeCamera', inject(($q: ng.IQService) => {
      spyOn(currentCall, 'changeCamera').and.returnValue($q.resolve());
      spyOn(currentCall, 'stopVideo').and.returnValue($q.resolve().then(() => {
        expect(currentCall.changeCamera).toHaveBeenCalled();
      }));
      component.changeCamera();
    }));

    it('should stopVideo', inject(($q: ng.IQService) => {
      component.isVideo = true;
      component.currentCall = currentCall;
      spyOn(currentCall, 'stopVideo').and.returnValue($q.resolve());
      component.stopVideo();
      expect(currentCall.stopVideo).toHaveBeenCalled();
    }));

    it('should toggleOptions', () => {
      spyOn(component, 'animateButtons');
      component.toggleOptions({} as Element);
      expect(component.animateButtons).toHaveBeenCalled();
    });

    it('should toggleMessenger', () => {
      spyOn(component, 'animateButtons');
      component.toggleMessenger({} as Element);
      expect(component.animateButtons).toHaveBeenCalled();
    });
  })
);
