import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {BtnDropdownComponentController} from './btn-dropdown.controller'
import {IBtnDropdownComponentBindings} from './btn-dropdown'
import btnDropdownModule from './btn-dropdown'

describe('Unit testing: profitelo.components.interface.btn-dropdown', () => {
  return describe('for checkbox component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: BtnDropdownComponentController
    let bindings: IBtnDropdownComponentBindings
    let document: ng.IDocumentService
    let validHTML = '<btn-dropdown></btn-dropdown>'

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(btnDropdownModule)
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

      component = componentController<BtnDropdownComponentController, {}>('btnDropdown', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
  })
})
