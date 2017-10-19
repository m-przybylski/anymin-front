import * as angular from 'angular'
import {IMessengerComponentBindings, default as messengerModule} from './messenger'
import soundsModule from '../../../services/sounds/sounds'
import {MessengerComponentController} from './messenger.controller'
import {CurrentExpertCall} from '../models/current-expert-call'
import {CurrentClientCall} from '../models/current-client-call'

describe('Unit testing: profitelo.components.communicator.messenger', () => {
  return describe('for messenger component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: MessengerComponentController

    const clientCallService = {
      onNewCall: (_cb: CurrentClientCall): void => {}
    }

    const expertCallService = {
      onNewCall: (_cb: CurrentExpertCall): void => {},
      onCallPull: (_cb: CurrentExpertCall): void => {}
    }

    const validHTML =
      '<messenger call-length="callLength" call-cost="callCost" is-messenger="isMessenger"></messenger>'

    const bindings: IMessengerComponentBindings = {
      isMessenger: false
    }

    function create(html: string, bindings: IMessengerComponentBindings): JQuery {
      const parentScope = rootScope.$new()
      const parentBoundScope = angular.extend(parentScope, bindings)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentBoundScope)
      parentBoundScope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(soundsModule)
      angular.mock.module(messengerModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('soundsService', {})
      $provide.value('apiUrl', 'awesomeUrl/')
      $provide.value('communicatorService', {})
      $provide.value('clientCallService', clientCallService)
      $provide.value('expertCallService', expertCallService)
    }))

    beforeEach(() => {

      //angular.mock.module(communicatorModule)

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope
        compile = $compile

        const injectors = {}

        component = $componentController<MessengerComponentController, IMessengerComponentBindings>(
          'messenger', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    })

    it('should minimizeMessenger', () => {
      component.minimizeMessenger()
      expect(component.isMessenger).toBe(false)
    })

    it('should maximizeMessenger', () => {
      component.maximizeMessenger()
      expect(component.isMessenger).toBe(true)
    })
  })
})
