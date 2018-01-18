import * as angular from 'angular'

import {UrlService} from '../../../services/url/url.service'
import communicatorMockModule from '../../communicator/communicator.mock';
import userModule from '../../../services/user/user';

interface IWindow {
  Audio: any;
}

interface IAudioMock {
  addEventListener: () => void,
  play: () => void,
  pause: () => void
}

declare let window: IWindow;

describe('Unit testing: profitelo.components.expert-profile.company-single-consultation', () => {
  return describe('for messenger component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: any
    let urlService: UrlService
    let audioOriginal: any
    const state: any = {
      go: (): void => {
      }
    }
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

    const callService = {
      callServiceId: (): null => {
        return null
      }
    }

    beforeEach(() => {
      angular.mock.module(communicatorMockModule)
      angular.mock.module(userModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
      $provide.value('callService', callService)
      $provide.value('$state', state)
    }))

    beforeEach(() => {

      angular.mock.module('profitelo.components.expert-profile.company-single-consultation')

      inject(($rootScope: any, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService, _urlService_: UrlService) => {
        rootScope = $rootScope.$new()
        compile = $compile
        urlService = _urlService_

        const injectors = {
          callService,
          $state: state
        }

        component = $componentController('companySingleConsultation', injectors, bindings)
        component.$onInit()
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
  })
})
