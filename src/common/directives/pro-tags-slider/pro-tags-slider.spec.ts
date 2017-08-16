import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {Tag} from 'profitelo-api-ng/model/models'
import {IProTagsSliderScope} from './pro-tags-slider'

describe('Unit testing: profitelo.directives.pro-tags-slider', () => {
  return describe('for pro-tags-slider directive >', () => {

    let scope: IProTagsSliderScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let _timeout: ng.ITimeoutService
    const validHTML = '<pro-tags-slider data-tags="[asds]"></pro-tags-slider>'

    beforeEach(() => {

    angular.mock.module('profitelo.directives.pro-tags-slider')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, $timeout: ng.ITimeoutService) => {
        rootScope = $rootScope.$new()
        compile = $compile
        _timeout = $timeout
      })
    })

    function create(html: string): JQuery {
      scope = <IProTagsSliderScope>rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      _timeout.flush()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should call next slide', () => {
      const el = create(validHTML)
      const isoScope = el.isolateScope<IProTagsSliderScope>()
      const tag = {name: 'sdsd', id: '999', status: Tag.StatusEnum.NEW, persisted: false}
      isoScope.tagAction(tag)
    })
  })
})
