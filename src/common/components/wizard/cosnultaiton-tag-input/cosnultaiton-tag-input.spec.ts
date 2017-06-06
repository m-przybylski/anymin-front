import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import consultationTagInputModule, {IConsultationTagInputBindings} from './cosnultaiton-tag-input'
import {ConsultationTagInputComponentController} from './cosnultaiton-tag-input.controller'

describe('Unit testing: profitelo.components.interface.consultation-tag-input', () => {
  return describe('for consultationTagInput component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: ConsultationTagInputComponentController
    let validHTML = '<consultation-tag-input></consultation-tag-input>'

    function create(html: string) {
      scope = rootScope.$new()
      scope.selectedItemsValue = []
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(consultationTagInputModule)
    })

    beforeEach(() => {
      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {
        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          $element: create(validHTML),
          $scope: rootScope
        }

        component = $componentController<ConsultationTagInputComponentController, IConsultationTagInputBindings>(
          'consultationTagInput', injectors
        )
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
  })
})
