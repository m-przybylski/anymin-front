import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {WizardUploaderComponentController} from './wizard-uploader.controller'
import {IWizardUploaderModuleComponentBindings} from './wizard-uploader'
import wizardUploaderModule from './wizard-uploader'

describe('Unit testing: profitelo.components.wizard.wizard-uploader', () => {
  return describe('for WizardUploader component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: WizardUploaderComponentController
    const validHTML = '<wizard-uploader token-list="[]"></wizard-uploader>'
    let bindings: IWizardUploaderModuleComponentBindings

    const uploaderFactory = {
      collectionTypes: {avatar: 'avatar'},
      getInstance: () => {
      }
    }

    function create(html: string) {
      scope = rootScope.$new()
      scope.selectedItemsValue = []
      scope.tokenList = ['file-token-1']
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL/')
      $provide.value('uploaderFactory', uploaderFactory)
    }))

    beforeEach(() => {
      angular.mock.module(wizardUploaderModule)
    })

    beforeEach(() => {

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {
        rootScope = $rootScope.$new()
        compile = $compile

        bindings = {
          tokenList: ['file-token-1']
        }

        const injectors = {
          $element: create(validHTML),
          $scope: rootScope
        }

        component = $componentController<WizardUploaderComponentController, IWizardUploaderModuleComponentBindings>(
          'wizardUploader', injectors, bindings
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

  })
})
