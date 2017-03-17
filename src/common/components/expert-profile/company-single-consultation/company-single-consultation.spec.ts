import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {UrlService} from '../../../services/url/url.service'
import communicatorModule from '../../communicator/communicator'

interface Window {
  Audio: any;
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
    const validHTML = '<company-single-consultation data-service-tags-employees-tuple="{details: {tags: [] }}" data-title="asd"></company-single-consultation>'
    const bindings = {
      serviceTagsEmployeesTuple: {
        details: {
          tags: []
        }
      },
      title: 'title'
    }
    const audioMock = {
      addEventListener: () => {
      },
      play: () => {
      },
      pause: () => {
      }
    }

    beforeEach(() => {
      audioOriginal = window.Audio
      window.Audio = () => audioMock
    })

    afterEach(() => {
      window.Audio = audioOriginal
    })

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    const callService = {
      callServiceId: () => {
        return null
      }
    }

    beforeEach(() => {
      angular.mock.module(communicatorModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
      $provide.value('callService', callService)
    }))

    beforeEach(() => {

      angular.mock.module('profitelo.components.expert-profile.company-single-consultation')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, _urlService_: UrlService) => {
        rootScope = $rootScope.$new()
        compile = $compile
        urlService = _urlService_

        const injectors = {
          callService: callService
        }

        component = _$componentController_('companySingleConsultation', injectors, bindings)
        component.$onInit()
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})
