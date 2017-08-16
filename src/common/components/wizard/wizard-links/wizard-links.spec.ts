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
    const validHTML = '<wizard-links></wizard-links>'
    let CommonSettingsService: CommonSettingsService
    const selectedLinks: string[] = []
    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
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

    it('should link invalid', () => {
      component.linkModel = 'profitelopl'
      component.onEnter()
      expect(component.badUrl).toBe(true)
    })

    it('should add http', () => {
      component.linkModel = 'profitelo.pl'
      component.onEnter()
      expect(component.linkModel).toBe('http://profitelo.pl')
    })

    it('should link valid and exist', () => {
      component.linkModel = 'http://profitelo.pl'
      component.selectedLinks = ['http://profitelo.pl']
      component.onEnter()
      expect(component.badUrl).toBe(false)
      expect(component.urlExist).toBe(true)
    })

    it('should delete link', () => {
      component.selectedLinks = ['link-1']
      component.removeLink('link-1')
      expect(component.selectedLinks.length).toBe(0)
    })

    it('should check is link exist', () => {
      component.selectedLinks = ['link-1']
      expect(component.checkLinkExist('link-1')).toEqual(true)
    })

  })
})
