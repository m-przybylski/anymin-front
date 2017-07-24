import * as angular from 'angular'
import {ManageDevicesComponentController} from './manage-devices.controller';
import manageDevicesModule from './manage-devices';

describe('Unit testing: profitelo.components.dashboard.settings.manageDevices', () => {
  return describe('for manageDevices component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: ManageDevicesComponentController

    const validHTML: string = '<manage-devices></manage-devices>'

    function create(html: string): JQuery {
      const parentScope: ng.IScope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentScope)
      parentScope.$digest()
      return compiledElement
    }

    beforeEach(() => {

      angular.mock.module(manageDevicesModule)

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          $element: create(validHTML)
        }

        component = $componentController<ManageDevicesComponentController, {}>('manageDevices', injectors, {})
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      const element: JQuery = create(validHTML)
      expect(element.html()).toBeDefined(true)
    })
  })
})
