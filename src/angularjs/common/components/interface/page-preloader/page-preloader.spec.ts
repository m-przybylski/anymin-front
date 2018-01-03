import * as angular from 'angular'
import pagePreloaderModule from './page-preloader'
import {PagePreloaderComponentController} from './page-preloader.controller'
import {PromiseService} from '../../../services/promise/promise.service'

describe('Unit testing: profitelo.components.interface.page-preloader', () => {
  return describe('for page-preloader component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: PagePreloaderComponentController
    let timeout: ng.ITimeoutService
    let state: ng.ui.IStateService

    const validHTML =
      '<page-preloader></page-preloader>'

    function create(html: string): JQuery {
      const parentScope: ng.IScope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentScope)
      parentScope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(pagePreloaderModule)
    })

    beforeEach(() => {
      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService, $timeout: ng.ITimeoutService,
              promiseService: PromiseService, $componentController: ng.IComponentControllerService,
              _$state_: ng.ui.IStateService) => {

        rootScope = $rootScope
        compile = $compile
        timeout = $timeout
        state = _$state_

        const injectors = {
          $state: state,
          $rootScope: rootScope,
          promiseService: promiseService,
          $element: create(validHTML)
        }

        component = $componentController<PagePreloaderComponentController, {}>('pagePreloader', injectors, {})
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should go to state onStateReload', () => {
      spyOn(state, 'go')
      component.onStateReload()
      expect(state.go).toHaveBeenCalled()
    })

    it('should start loading process when state changes', () => {
      component.isError = true
      component.$onInit()
      const stateObject: ng.ui.IState = {
        name: 'dashboard',
        resolve: { getClients: () => true }
      }
      rootScope.$broadcast('$stateChangeStart', stateObject, undefined, {name: 'home'})
      expect(component.isError).toBe(false)
      expect(component.isLoading).toBe(true)
    })

    it('should end loading process when state loaded', () => {
      component.isError = true
      component.$onInit()
      const stateObject: ng.ui.IState = {
        name: 'dashboard',
        resolve: { getClients: () => true }
      }
      rootScope.$broadcast('$stateChangeStart', stateObject, undefined, {name: 'home'})
      expect(component.isLoading).toBe(true)
      rootScope.$broadcast('$stateChangeSuccess', stateObject, undefined, {name: 'home'})
      expect(component.isError).toBe(false)
      expect(component.isLoading).toBe(false)
    })

  })
})
