import * as angular from 'angular'
import {IMessengerMaximizedComponentBindings} from './maximized'
import {UrlService} from '../../../../services/url/url.service'
import {MessengerMaximizedComponentController} from './maximized.controller'
import communicatorModule from '../../communicator'
import {ClientCallService} from '../../call-services/client-call.service'
import {ExpertCallService} from '../../call-services/expert-call.service'
import {CurrentClientCall} from '../../models/current-client-call'
import {CurrentExpertCall} from '../../models/current-expert-call'
import {UploaderFactory} from '../../../../services/uploader/uploader.factory'
import messengerMaximizedModule from './maximized'
import filtersModule from '../../../../filters/filters'
import urlModule from '../../../../services/url/url'
import {UploaderService} from '../../../../services/uploader/uploader.service'

describe('Unit testing: profitelo.components.communicator.messenger.maximized', () => {
  return describe('for messengerMaximized component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: MessengerMaximizedComponentController
    const validHTML =
      '<maximized call-length="callLength" call-cost="callCost" minimize-messenger="minimizeMessenger"></maximized>'

    const bindings: IMessengerMaximizedComponentBindings = {
      isMessenger: true,
      minimizeMessenger: (): void => {
      }
    }

    let uploaderService: UploaderService

    const clientCallService: ClientCallService = {
      onNewCall: (_cb: (call: CurrentClientCall) => void): void => {}
    } as ClientCallService

    const expertCallService: ExpertCallService = {
      onNewCall: (_cb: (call: CurrentExpertCall) => void): void => {},
      onCallPull: (_cb: (call: CurrentExpertCall) => void): void => {}
    } as ExpertCallService

    const uploaderFactory: UploaderFactory = {
      getInstance: (): UploaderService => uploaderService as UploaderService
    } as UploaderFactory

    function create(html: string, bindings: IMessengerMaximizedComponentBindings): JQuery {
      const parentScope: ng.IScope = rootScope.$new()
      const parentBoundScope = angular.extend(parentScope, bindings)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentBoundScope)
      parentBoundScope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(communicatorModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
      $provide.value('clientCallService', clientCallService)
      $provide.value('expertCallService', expertCallService)
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.services.uploader')
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('uploaderFactory', uploaderFactory)
      $provide.value('uploaderService', UploaderService)
    }))

    beforeEach(() => {
      angular.mock.module(urlModule)
      angular.mock.module(filtersModule)
      angular.mock.module(messengerMaximizedModule)

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService, _uploaderService_: UploaderService,
              $componentController: ng.IComponentControllerService, _urlService_: UrlService) => {

        rootScope = $rootScope.$new()
        compile = $compile
        uploaderService = _uploaderService_
        const injectors = {
          expertCallService: expertCallService,
          clientCallService: clientCallService,
          $element: create(validHTML, bindings),
          uploaderFactory: uploaderFactory,
          urlService: _urlService_
        }
        component = $componentController<MessengerMaximizedComponentController, IMessengerMaximizedComponentBindings>(
          'messengerMaximized', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    })

  })
})
