import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {BtnDropdownCallComponentController} from './btn-dropdown-call.controller'
import {IBtnDropdownCallComponentBindings} from './btn-dropdown-call'
import btnDropdownCallModule from './btn-dropdown-call'

describe('Unit testing: profitelo.components.interface.btn-dropdown-call', () => {
  return describe('for btn-dropdown-call component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: BtnDropdownCallComponentController
    let bindings: IBtnDropdownCallComponentBindings
    let document: ng.IDocumentService
    const validHTML = '<btn-dropdown-call></btn-dropdown-call>'

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    let element: ng.IRootElementService

    beforeEach(() => {
      angular.mock.module(btnDropdownCallModule)
    })

    beforeEach(() => {
      angular.mock.module('pascalprecht.translate')
      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$document_: ng.IDocumentService,
              _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        document = _$document_
      })

      bindings = {
        callback: (): void => {},
        buttonText: 'Tekst',
        buttonClass: 'icon-left'
      }

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope,
        $document: document
      }

      element = compile(validHTML)(rootScope)

      component = componentController<BtnDropdownCallComponentController, {}>('btnDropdownCall', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should click on document and close btn-dropdown-call', () => {
      document.trigger('click')
      document.bind(event)
      expect(component.isOpen).toBe(false)
    })

    it('should open btn-collapse', () => {
      component.toggleButton()
      expect(component.isOpen).toBe(true)
    })

    it('should closing btn and call callback', () => {
      spyOn(component, 'callback')
      component.onSelectItem()
      expect(component.isOpen).toBe(false)
      expect(component.callback).toHaveBeenCalled()
    })
  })
})

