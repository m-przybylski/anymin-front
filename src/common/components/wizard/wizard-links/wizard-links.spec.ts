import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {CommonSettingsService} from '../../../services/common-settings/common-settings.service'
import {WizardLinksComponentController} from './wizard-links.controller'
import wizardLinksModule from './wizard-links'
import {IWizardLinksComponentBindings} from './wizard-links'

describe('Unit testing: WizardLinksController', () => {
  return describe('for WizardLinksInput component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: WizardLinksComponentController
    let validHTML = '<wizard-links></wizard-links>'
    let CommonSettingsService: CommonSettingsService
    let selectedLinks: string[] = []
    function create(html: string) {
      scope = rootScope.$new()
      scope.selectedItemsValue = []
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(wizardLinksModule)
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

        component = $componentController<WizardLinksComponentController, IWizardLinksComponentBindings>(
          'wizardLinks', injectors, {
            selectedLinks: selectedLinks
          }
        )

      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should add link', inject(() => {
      component.linkModel = 'profitelo.pl'
      component.onEnter()
      expect(component.selectedLinks.length > 0)
    }))

  })
})
