import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import inputConsultationEmployeeModule, {IInputConsultationEmployeeBindings} from './input-consultation-employee'
import {InputConsultationEmployeeComponentController} from './input-consultation-employee.controller'
import {CommonSettingsService} from '../../../services/common-settings/common-settings.service'

describe('Unit testing: profitelo.components.interface.input-consultation-employee', () => {
  return describe('for inputConsultationEmployee component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: InputConsultationEmployeeComponentController
    const validHTML = '<input-consultation-employee></input-consultation-employee>'
    let CommonSettingsService: CommonSettingsService

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(inputConsultationEmployeeModule)
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

        component = $componentController<InputConsultationEmployeeComponentController, IInputConsultationEmployeeBindings>(
          'inputConsultationEmployee', injectors, {
            isOwnerEmployee: false,
            addedItemsList: []
          }
        )

      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should delete selected item', () => {
      component.addedItemsList = [
        'asd'
      ]
      component.deleteSelectedItem(0)
      expect(component.addedItemsList.length).toBe(0)
    })

    it('should works onBlur', () => {
      component.onBlur()
      expect(component.isDirty).toBe(true)
      expect(component.isInputValueInvalid).toBe(false)
    })

    it('should input value invalid', () => {
      component.inputValue = ''
      component.onEnter(component.inputValue)
      expect(component.isInputValueInvalid).toBe(true)
    })

    it('should input value valid', () => {
      component.inputValue = 'input@value.com'
      component.addedItemsList = ['ex@op.com']
      component.onEnter(component.inputValue)
      expect(component.isInputValueInvalid).toBe(false)
      expect(component.addedItemsList.length).toBe(2)
      expect(component.inputValue).toBe('')
    })

  })
})
