import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import userModule from '../../../../services/user/user'
import * as angular from 'angular'
import {PromiseService} from '../../../../services/promise/promise.service';
describe('Unit testing: profitelo.components.dashboard.client.navigation', () => {
  return describe('for clientNavigation >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    const validHTML = '<client-navigation></client-navigation>'
    const userService = {
      getUser: (): void => {

      }
    }

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(userModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
      $provide.value('userService', userService)
    }))

    beforeEach(() => {

      angular.mock.module('profitelo.components.dashboard.client.navigation')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              $q: ng.IQService, _$componentController_: ng.IComponentControllerService,
              promiseService: PromiseService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile

        spyOn(userService, 'getUser').and.returnValue($q.resolve({defaultCreditCard: 'dsdsdsd'}))

        component = componentController('clientNavigation', {}, {
          userService: userService,
          promiseService: promiseService,
          $element: create(validHTML)
        })
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

  })
})

