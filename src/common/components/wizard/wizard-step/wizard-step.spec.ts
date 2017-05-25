import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IWindowService} from '../../../services/window/window.service'
import wizardStepModule from './wizard-step'
import {WizardStepModuleComponentController} from './wizard-step.controller'

describe('Unit testing: profitelo.components.wizard.wizard-step', () => {
  return describe('for wizardStep component >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: WizardStepModuleComponentController
    let window: IWindowService
    let bindings: any
    let document: ng.IDocumentService
    let validHTML = '<input-dropdown-tag></input-dropdown-tag>'


    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(wizardStepModule)
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

      }

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope,
        $document: document
      }

      component = componentController('wizardStep', injectors, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
  })
})
