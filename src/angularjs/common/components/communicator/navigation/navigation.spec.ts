import * as angular from 'angular'

import './navigation'
import communicatorModule from '../communicator'
import {CurrentCall} from '../models/current-call';
import {ClientCallService} from '../call-services/client-call.service';
import {ExpertCallService} from '../call-services/expert-call.service';
import navigationModule from './navigation';
import {INavigationComponentBindings, NavigationComponentController} from './navigation.controller';
import {CurrentExpertCall} from '../models/current-expert-call'
import {CurrentClientCall} from '../models/current-client-call'

describe('Unit testing: profitelo.components.communicator.navigation', () => {
  return describe('for communicatorNav component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: NavigationComponentController

    const validHTML: string = '<communicator-nav is-video="isVideo" is-messenger="isMessenger"></communicator-nav>'

    const currentCall: CurrentCall = {
      stopAudio: (): void => {},
      startAudio: (): void => {},
      startVideo: (): void => {},
      stopVideo: (): void => {},
      changeCamera: (): void => {}
    } as CurrentCall

    const bindings: INavigationComponentBindings = {
      currentCall: currentCall,
      isMessenger: false,
      isVideo: false
    }

    const clientCallService: ClientCallService = {
      onNewCall: (_cb: (call: CurrentClientCall) => void): void => {}
    } as ClientCallService

    const expertCallService: ExpertCallService = {
      onNewCall: (_cb: (call: CurrentExpertCall) => void): void => {},
      onCallPull: (_cb: (call: CurrentExpertCall) => void): void => {}
    } as ExpertCallService

    beforeEach(() => {
      angular.mock.module(communicatorModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
      $provide.value('clientCallService', clientCallService)
      $provide.value('expertCallService', expertCallService)
    }))

    beforeEach(() => {

      angular.mock.module(navigationModule)

      inject(($rootScope: any, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          expertCallService: expertCallService,
          clientCallService: clientCallService
        }

        component = $componentController<NavigationComponentController, INavigationComponentBindings>(
          'communicatorNav', injectors, bindings
        )
      })
    })

    function create(html: string, bindings: INavigationComponentBindings): JQuery {
      const parentScope: ng.IScope = rootScope.$new()
      const parentBoundScope = angular.extend(parentScope, bindings)
      const elem: JQuery = angular.element(html)
      const compiledElement: JQuery = compile(elem)(parentBoundScope)
      parentBoundScope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el: JQuery = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    })

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
      }
      spyOn(event.currentTarget.classList, 'contains').and.returnValue(true)
      spyOn(event.currentTarget.classList, 'add')
      spyOn(event.currentTarget.classList, 'remove')
      component.animateButtons(event)
      expect(event.currentTarget.classList.contains).toHaveBeenCalled()
      expect(event.currentTarget.classList.add).toHaveBeenCalled()
      expect(event.currentTarget.classList.remove).toHaveBeenCalled()
    })

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
      }
      spyOn(event.currentTarget.classList, 'contains').and.returnValue(false)
      spyOn(event.currentTarget.classList, 'add')
      spyOn(event.currentTarget.classList, 'remove')
      component.animateButtons(event)
      expect(event.currentTarget.classList.contains).toHaveBeenCalled()
      expect(event.currentTarget.classList.add).toHaveBeenCalled()
      expect(event.currentTarget.classList.remove).toHaveBeenCalled()
    })

    it('should startAudio', inject(($q: ng.IQService) => {
      spyOn(currentCall, 'startAudio').and.returnValue($q.resolve())
      component.startAudio()
      expect(currentCall.startAudio).toHaveBeenCalled()
    }))

    it('should stopAudio', inject(() => {
      spyOn(currentCall, 'stopAudio')
      component.stopAudio()
      expect(currentCall.stopAudio).toHaveBeenCalled()
    }))

    it('should startVideo', inject(($q: ng.IQService) => {
      spyOn(currentCall, 'startVideo').and.returnValue($q.resolve())
      spyOn(component, 'animateButtons')
      component.startVideo({} as Element)
      expect(component.animateButtons).toHaveBeenCalled()
      expect(currentCall.startVideo).toHaveBeenCalled()
    }))

    it('should changeCamera', inject(($q: ng.IQService) => {
      spyOn(currentCall, 'changeCamera').and.returnValue($q.resolve())
      component.changeCamera()
      expect(currentCall.changeCamera).toHaveBeenCalled()
    }))

    it('should stopVideo', inject(($q: ng.IQService) => {
      spyOn(currentCall, 'stopVideo').and.returnValue($q.resolve())
      component.stopVideo()
      expect(currentCall.stopVideo).toHaveBeenCalled()
    }))

    it('should toggleOptions', () => {
      spyOn(component, 'animateButtons')
      component.toggleOptions({} as Element)
      expect(component.animateButtons).toHaveBeenCalled()
    })

    it('should toggleMessenger', () => {
      spyOn(component, 'animateButtons')
      component.toggleMessenger({} as Element)
      expect(component.animateButtons).toHaveBeenCalled()
    })
  })
})
