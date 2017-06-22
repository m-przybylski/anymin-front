import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {WizardHandlerComponentController} from './wizard-handler.controller'
import {IWizardHandlerComponentBindings} from './wizard-handler'
import wizardAvatarModule from './wizard-handler'
import {SmoothScrollingService} from '../../../services/smooth-scrolling/smooth-scrolling.service'

describe('Unit testing: profitelo.components.wizard.wizard-handler', () => {
  return describe('for WizardHandler component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: WizardHandlerComponentController
    let validHTML = '<wizard-handler></wizard-handler>'
    let bindings: IWizardHandlerComponentBindings
    let smoothScrollingService: SmoothScrollingService

    function create(html: string) {
      scope = rootScope.$new()
      scope.selectedItemsValue = []
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL/')
    }))

    beforeEach(() => {
      angular.mock.module(wizardAvatarModule)
    })

    beforeEach(() => {
      angular.mock.module('profitelo.services.smooth-scrolling')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService, _smoothScrollingService_: SmoothScrollingService) => {
        rootScope = $rootScope.$new()
        compile = $compile
        smoothScrollingService = _smoothScrollingService_

        bindings = {
          onStepChange: () => {}
        }

        const injectors = {
          $element: create(validHTML),
          $scope: rootScope
        }

        component = $componentController<WizardHandlerComponentController, IWizardHandlerComponentBindings>(
          'wizardHandler', injectors, bindings
        )

      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

  })
})
