import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IWindowService} from '../../../services/window/window.service'
describe('Unit testing: profitelo.components.interface.dropdown-primary', () => {
  return describe('for dropdownPrimary component >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let window: IWindowService
    let bindings: any
    let timeout: ng.ITimeoutService
    let document: ng.IDocumentService
    const validHTML = '<dropdown-primary data-label="asd" data-icon="icon"></dropdown-primary>'
    let smoothScrolling

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {

      angular.mock.module('profitelo.components.interface.dropdown-primary')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, _$window_: IWindowService,
              _$timeout_: ng.ITimeoutService, _$document_: ng.IDocumentService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        timeout = _$timeout_
        window = _$window_
        document = _$document_
      })

      bindings = {
        label: 'test',
        icon: 'icon'
      }

      smoothScrolling = {
        simpleScrollTo: (): null => {
          return null
        }
      }

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope,
        $window: window,
        smoothScrolling: smoothScrolling,
        $document: document
      }

      component = componentController('dropdownPrimary', injectors, bindings)
      timeout.flush()
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should compile the component', () => {
      component.$onInit()

    })
  })
})
