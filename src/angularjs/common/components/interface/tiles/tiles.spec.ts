import * as angular from 'angular'
import './tiles'
import {TilesComponentController} from './tiles.controller'
import tilesModule from './tiles'

describe('Unit testing: profitelo.components.interface.tiles', () => {
  return describe('for tiles component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: TilesComponentController

    const validHTML = '<tiles></tiles>'

    function create(html: string): JQuery {
      const parentScope: ng.IScope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentScope)
      parentScope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(tilesModule)
    })

    beforeEach(() => {
      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService) => {

        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          $element: create(validHTML)
        }

        component = $componentController<TilesComponentController, {}>('tiles', injectors, {})
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
