import * as angular from 'angular'
import {PagePreloaderComponent} from './page-preloader.component'
import pagePreloaderModule from './page-preloader'

describe('Unit testing: profitelo.components.interface.page-preloader', () => {
  return describe('for page-preloader component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: PagePreloaderComponent
    let timeout: ng.ITimeoutService

    const validHTML =
      '<page-preloader></page-preloader>'


    function create(html: string): JQuery {
      const parentScope: ng.IScope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentScope)
      parentScope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(pagePreloaderModule)
    })

    beforeEach(() => {
      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService, $timeout: ng.ITimeoutService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope
        compile = $compile
        timeout = $timeout

        const injectors = {
          $element: create(validHTML)
        }

        component = $componentController<PagePreloaderComponent, {}>('pagePreloader', injectors, {})
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))


  })
})
