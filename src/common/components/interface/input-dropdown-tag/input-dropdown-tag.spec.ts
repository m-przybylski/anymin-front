import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IWindowService} from '../../../services/window/window.service'
import inputDropdownTagModule from './input-dropdown-tag'
import {IDropdownItem, InputDropdownTagComponentController} from './input-dropdown-tag.controller'
import {InputDropdownTagComponentBindings} from './input-dropdown-tag'

describe('Unit testing: profitelo.components.interface.input-dropdown-tag', () => {
  return describe('for inputDropdownTag component >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: InputDropdownTagComponentController
    let window: IWindowService
    let bindings: InputDropdownTagComponentBindings
    let document: ng.IDocumentService
    let validHTML = '<input-dropdown-tag data-selected-items-value="selectedItemsValue"></input-dropdown-tag>'
    let filteredItems: Array<IDropdownItem>


    function create(html: string) {
      scope = rootScope.$new()
      scope.selectedItemsValue = []
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(inputDropdownTagModule)
    })

    beforeEach(() => {
      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, _$window_: IWindowService,
              _$document_: ng.IDocumentService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        window = _$window_
        document = _$document_
      })

      bindings = {
        placeholder: 'test',
        label: 'asas',
        hintLabel: 'sdsd',
        dictionary: {
          A: 'AA'
        },
        selectedItemsValue: ['asd']
      }

      filteredItems = [{
        name: 'name2',
        value: 'asd'
      }]

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope,
        $document: document
      }

      component = componentController('inputDropdownTag', injectors, bindings)

    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
  })
})
