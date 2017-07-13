import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {OutputComponentController} from './output.controller'
import {IOutputComponentBindings} from './output'
import outputModule from './output'

describe('Unit testing: profitelo.components.interface.checkbox', () => {
  return describe('for outputPrimary component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: OutputComponentController
    let bindings: IOutputComponentBindings
    let document: ng.IDocumentService
    let validHTML = '<output></output>'

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(outputModule)
    })

    beforeEach(() => {
      angular.mock.module('pascalprecht.translate')
      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      bindings = {
        id: '@',
        labelText: '@',
        ngModel: false,
        value: 10,
        consultationCost: 2,
        callback: () => {}
      }

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope,
        $document: document
      }

      component = componentController<OutputComponentController, {}>('outputPrimary', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
  })
})
