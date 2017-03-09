import * as angular from "angular"
import "jquery-bridget"
import "masonry-layout/dist/masonry.pkgd"
import "ng-masonry"
import "angular-masonry"
import "./pro-masonry"
import IRootScopeService = profitelo.services.rootScope.IRootScopeService

describe('Unit testing: profitelo.directives.pro-masonry', () => {
  return describe('for pro-masonry directive >', () => {

    let scope: any = null
    let rootScope: ng.IRootScopeService
    let compile: any = null
    let validHTML = '<div pro-masonry="" data-grid-item=".grid-item"></div></div>'
    let timeout: ng.ITimeoutService
    let $log: ng.ILogService

    beforeEach(() => {
      //angular.mock.module('templates-module')
      angular.mock.module('profitelo.directives.pro-masonry')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _$log_: ng.ILogService,
              _$timeout_: ng.ITimeoutService) => {
        rootScope = $rootScope.$new()
        compile = $compile
        timeout = _$timeout_
        $log = _$log_
      })
    })

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      timeout.flush()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should throw error', () => {
      spyOn($log, 'error')
      validHTML = '<div pro-masonry="" ></div></div>'
      create(validHTML)
      expect($log.error).toHaveBeenCalled()
    })
  })
})
