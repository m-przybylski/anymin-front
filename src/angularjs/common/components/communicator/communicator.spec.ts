import * as angular from 'angular'
import './communicator'
import {CommunicatorComponentController} from './communicator.controller'
import communicatorModule from './communicator'
import userModule from '../../services/user/user'
import messengerModule from './messenger/messenger'

describe('Unit testing: profitelo.components.communicator', () => {
  return describe('for communicator component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: CommunicatorComponentController

    beforeEach(() => {
      angular.mock.module(userModule)
      angular.mock.module(messengerModule)
      angular.mock.module(communicatorModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          $element: {
            find: () => {}
          }
        }

        component = $componentController<CommunicatorComponentController, {}>('communicator', injectors, {})
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
  })
})
