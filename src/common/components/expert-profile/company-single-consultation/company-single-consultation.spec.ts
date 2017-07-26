import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {UrlService} from '../../../services/url/url.service'
import communicatorModule from '../../communicator/communicator'

interface Window {
  Audio: any;
}

interface IAudioMock {
  addEventListener: () => void,
  play: () => void,
  pause: () => void
}

declare let window: Window;

describe('Unit testing: profitelo.components.expert-profile.company-single-consultation', () => {
  return describe('for messenger component >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: any
    let urlService: UrlService
    let audioOriginal: any
    const state: any = {
      go: (): void => {
      }
    }
    const validHTML = '<company-single-consultation data-service-tags-employees-tuple="{details: {tags: [] }}" data-title="asd"></company-single-consultation>'
    const bindings = {
      serviceTagsEmployeesTuple: {
        tags: []
      },
      title: 'title'
    }
    const audioMock = {
      addEventListener: (): void => {
      },
      play: (): void => {
      },
      pause: (): void => {
      }
    }

    beforeEach(() => {
      audioOriginal = window.Audio
      window.Audio = (): IAudioMock => audioMock
    })

    afterEach(() => {
      window.Audio = audioOriginal
    })

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    const callService = {
      callServiceId: (): null => {
        return null
      }
    }

    beforeEach(() => {
      angular.mock.module(communicatorModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
      $provide.value('callService', callService)
      $provide.value('$state', state)
    }))

    beforeEach(() => {

      angular.mock.module('profitelo.components.expert-profile.company-single-consultation')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService, _urlService_: UrlService) => {
        rootScope = $rootScope.$new()
        compile = $compile
        urlService = _urlService_

        const injectors = {
          callService: callService,
          $state: state
        }

        component = $componentController('companySingleConsultation', injectors, bindings)
        component.$onInit()
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})
