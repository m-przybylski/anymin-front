import * as angular from 'angular'

import {CookieNotificationComponentController} from './cookie-notification.controller'
import commonConfigModule from '../../../../../generated_modules/common-config/common-config'

describe('Unit testing: profitelo.components.cookies', () => {
  describe('for cookie component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: CookieNotificationComponentController
    const validHTML = '<cookie-notification></cookie-notification>'

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {

      angular.mock.module('profitelo.components.cookie-notification')
      angular.mock.module('ngCookies')
      angular.mock.module(commonConfigModule)

      inject(($rootScope: any, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })


      const injectors = {
        $element: create(validHTML),
        $scope: rootScope
      }
      component = componentController<CookieNotificationComponentController, {}>('cookieNotification', injectors, {})
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
