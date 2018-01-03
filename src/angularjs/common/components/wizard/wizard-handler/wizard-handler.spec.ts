import * as angular from 'angular'

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
    const validHTML = '<wizard-handler><wizard-step><input type="text" value="aaa"></wizard-step><wizard-step><input></wizard-step></wizard-handler>'
    let bindings: IWizardHandlerComponentBindings
    let smoothScrollingService: SmoothScrollingService
    let timeout: ng.ITimeoutService

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
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

      inject(($rootScope: any, $compile: ng.ICompileService, $timeout: ng.ITimeoutService,
              $componentController: ng.IComponentControllerService,
              _smoothScrollingService_: SmoothScrollingService) => {
        rootScope = $rootScope.$new()
        compile = $compile
        timeout = $timeout
        smoothScrollingService = _smoothScrollingService_

        bindings = {
          onStepChange: (): void => {},
          progressBarText: 'sdsa'
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
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should change progessWisth on scroll', () => {
      const el = create(validHTML)
      const controller = el.controller('wizard-handler')
      $(window).triggerHandler('scroll')
      timeout.flush()
      expect(controller.progressWidth).toEqual(50)
    })

  })
})
