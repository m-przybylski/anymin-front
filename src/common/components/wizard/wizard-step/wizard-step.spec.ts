import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IWindowService} from '../../../services/window/window.service'
import wizardStepModule from './wizard-step'
import {WizardStepComponentController} from './wizard-step.controller'
import {IWizardStepModuleComponentBindings} from './wizard-step'
import {WizardHandlerComponentController} from '../wizard-handler/wizard-handler.controller'
import {IWizardHandlerComponentBindings, default as wizardHandlerModule} from '../wizard-handler/wizard-handler'

describe('Unit testing: profitelo.components.wizard.wizard-step', () => {
  return describe('for wizardStep component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: WizardStepComponentController
    let window: IWindowService
    let bindings: IWizardStepModuleComponentBindings
    let document: ng.IDocumentService

    beforeEach(() => {
      angular.mock.module(wizardHandlerModule)
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
        title: 'aaa',
        checkIsStepValid: () => true,
        additionalText: 'AddText',
        tooltipText: 'Tooltip',
        buttonTitle: 'button',
        required: true,
        onGoToNext: () => true,
        onGoBack: () => true
      }

      const injectors = {
        $scope: rootScope,
        $document: document
      }
      component = componentController<WizardStepComponentController, IWizardStepModuleComponentBindings>
      ('wizardStep', injectors, bindings)
      component.wizardHandler = componentController<WizardHandlerComponentController, IWizardHandlerComponentBindings>
      ('wizardHandler', {$element: {}})
    })

  })
})
