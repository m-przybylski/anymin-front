import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import consultationEmployeeInputModule, {IConsultationEmployeeInputBindings} from './consultation-employee-input'
import {ConsultationEmployeeInputComponentController} from './consultation-employee-input.controller'
import {CommonSettingsService} from '../../../services/common-settings/common-settings.service'

describe('Unit testing: profitelo.components.wizard.consultation-employee-input', () => {
  return describe('for consultationEmployeeInput component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: ConsultationEmployeeInputComponentController
    let validHTML = '<consultation-employee-input></consultation-employee-input>'
    let CommonSettingsService: CommonSettingsService

    function create(html: string) {
      scope = rootScope.$new()
      scope.selectedItemsValue = []
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(consultationEmployeeInputModule)
    })

    beforeEach(() => {
      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService, _CommonSettingsService_: CommonSettingsService) => {
        CommonSettingsService = _CommonSettingsService_
        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          $element: create(validHTML),
          $scope: rootScope
        }

        component = $componentController<ConsultationEmployeeInputComponentController, IConsultationEmployeeInputBindings>(
          'consultationEmployeeInput', injectors, {
            isOwnerEmployee: false,
            addedItemsList: []
          }
        )

      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
  })
})
