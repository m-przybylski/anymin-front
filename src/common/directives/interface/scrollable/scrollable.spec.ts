import {IWindowService} from '../../../services/window/window.service'
import * as angular from 'angular'
import IStyleConstant = profitelo.constants.style.IStyleConstant
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
describe('Unit testing: profitelo.directives.interface.scrollable', () => {
  return describe('for profitelo.directives.scrollable directive >', () => {

    let scope: any = null
    let rootScope: ng.IRootScopeService
    let compile: any = null
    let timeout: ng.ITimeoutService
    let interval: ng.IIntervalService
    let window: IWindowService
    let styleConstant: IStyleConstant
    const validHTML = '<scrollable></scrollable>'

    beforeEach(() => {

      angular.mock.module('profitelo.constants.style')
      angular.mock.module('profitelo.directives.interface.scrollable')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _$timeout_: ng.ITimeoutService,
              _$interval_: ng.IIntervalService, _$window_: IWindowService, _styleConstant_: IStyleConstant) => {
        rootScope = $rootScope.$new()
        compile = $compile
        timeout = _$timeout_
        window = _$window_
        interval = _$interval_
        styleConstant = _styleConstant_
      })

    })

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should timeout', inject(() => {
      create(validHTML)
      timeout.flush()
    }))

    it('should timeout', inject(() => {
      create(validHTML)
      timeout.flush()
    }))

    it('should assignNewHeightConainer', inject(() => {
      create(validHTML)
    }))
  })
})
