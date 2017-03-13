import * as angular from "angular"
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {NavigationComponentController, INavigationComponentBindings} from "./navigation"
import {CallService} from "../call.service"
import "./navigation"
import communicatorModule from "../communicator"

describe('Unit testing: profitelo.components.communicator.navigation', () => {
  return describe('for communicatorNav component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: NavigationComponentController

    const validHTML: string = '<communicator-nav is-video="isVideo" is-messenger="isMessenger"></communicator-nav>'

    const bindings: INavigationComponentBindings = {
      isVideo: false,
      isMessenger: false
    }

    const callService = {
      startAudio: () => {
      },
      stopAudio: () => {
      },
      startVideo: () => {
      },
      stopVideo: () => {
      },
    }

    beforeEach(() => {
      angular.mock.module(communicatorModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
      $provide.value('callService', callService)
    }))

    beforeEach(() => {
      //angular.mock.module('templates-module')
      angular.mock.module('profitelo.components.communicator.navigation')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          callService: callService
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
            contains: () => true,
            add: () => {
            },
            remove: () => {
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
            contains: () => false,
            add: () => {
            },
            remove: () => {
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

    it('should startAudio', inject((callService: CallService) => {
      spyOn(callService, 'startAudio')
      component.startAudio()
      expect(callService.startAudio).toHaveBeenCalled()
    }))

    it('should stopAudio', inject((callService: CallService) => {
      spyOn(callService, 'stopAudio')
      component.stopAudio()
      expect(callService.stopAudio).toHaveBeenCalled()
    }))

    it('should startVideo', () => {
      spyOn(component, 'animateButtons')
      component.startVideo(<any>{})
      expect(component.animateButtons).toHaveBeenCalled()
    })

    it('should stopVideo', inject((callService: CallService) => {
      spyOn(callService, 'stopVideo')
      component.stopVideo()
      expect(callService.stopVideo).toHaveBeenCalled()
    }))

    it('should toggleOptions', () => {
      spyOn(component, 'animateButtons')
      component.toggleOptions(<any>{})
      expect(component.animateButtons).toHaveBeenCalled()
    })

    it('should toggleMessenger', () => {
      spyOn(component, 'animateButtons')
      component.toggleMessenger(<any>{})
      expect(component.animateButtons).toHaveBeenCalled()
    })
  })
})
