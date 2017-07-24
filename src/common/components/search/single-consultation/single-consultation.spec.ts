import * as angular from 'angular'
import './single-consultation'

import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import communicatorModule from '../../communicator/communicator'
describe('Unit testing:profitelo.components.search.single-consultation', () => {
  return describe('for single-consultation component >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let _callService: any
    let validHTML = '<single-consultation data-consultation="{id: 1, owner: {img: 1212, type: ORG}}"></single-consultation>'
    let state: ng.ui.IStateService

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    const bindings = {
      consultation: {
        id: 1,
        owner: {
          type: 'ORG'
        }
      }
    }

    const userService = {
      getUser: (): boolean => true
    }

    const callService = {
      callServiceId: (): void => {
      }
    }

    beforeEach(() => {
      angular.mock.module(communicatorModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
      $provide.value('callService', callService)
      $provide.value('userService', userService)

    }))

    beforeEach(() => {

      angular.mock.module('ui.router')
      angular.mock.module('profitelo.components.search.single-consultation')
    })

    beforeEach(() => {

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, $q: ng.IQService) => {
        componentController = _$componentController_
        rootScope = $rootScope
        compile = $compile
        _callService = callService
        state = <ng.ui.IStateService>{
          go: (_x: any): {} => {
            return {}
          }
        }

        spyOn(userService, 'getUser').and.callFake(() => $q.resolve({id: 'asdasdasd'}))

        component = componentController('singleConsultation', {
          $element: validHTML, $scope: scope,
          callService: _callService,
          $state: state,
          userService: userService
        }, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should set isLinkActive to false', () => {
      const el = create(validHTML)
      const isoScope: any = el.isolateScope()
      el.find('.btn.btn-success').triggerHandler('mouseover')
      expect(isoScope.$ctrl.isLinkActive).toBe(false)
    })

    it('should set isLinkActive to true', () => {
      const el = create(validHTML)
      const isoScope: any = el.isolateScope()
      el.find('.btn.btn-success').triggerHandler('mouseover')
      el.find('.btn.btn-success').triggerHandler('mouseout')
      expect(isoScope.$ctrl.isLinkActive).toBe(true)
    })

    it('should call state go', () => {
      spyOn(state, 'go')
      component.goToProfile()
      expect(state.go).toHaveBeenCalled()
    })

    it('should set profile image as null', () => {
      validHTML = '<single-consultation data-consultation="{id: 1, owner: {type: ORG}}"></single-consultation>'
      const el = create(validHTML)
      const isoScope: any = el.isolateScope()
      expect(isoScope.$ctrl.profileImage).toEqual(null)
    })

  })
})
