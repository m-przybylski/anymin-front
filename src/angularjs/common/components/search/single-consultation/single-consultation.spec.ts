import * as angular from 'angular'
import './single-consultation'

import communicatorModule from '../../communicator/communicator'
import {ISingleConsultationScope} from './single-consultation'
import {Tag} from 'profitelo-api-ng/model/models';

describe('Unit testing:profitelo.components.search.single-consultation', () => {
  return describe('for single-consultation component >', () => {

    let scope: ISingleConsultationScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let _callService: any
    let validHTML =
      '<single-consultation data-consultation="consultation"></single-consultation>'
    let state: ng.ui.IStateService

    const consultation = {
      id: 1,
      service: {
        id: 'id',
        ownerId: 'ownerId',
        name: 'name',
        price: {
          amount: 123,
          currency: 'PLN'
        },
        rating: 123,
        usageCounter: 123,
        usageDurationInSeconds: 123,
        isSuspended: false,
        languages: [],
        createdAt: 123
      },
      ownerProfile: {
        id: 'id',
        isActive: false,
        expertDetails: {
          name: 'name',
          avatar: 'avatar',
          description: 'desc',
          languages: ['pl'],
          files: ['file'],
          links: ['link']
        }
      },
      expertProfile: {
        id: 'asdasd',
        name: 'asdasd',
        avatar: 'asdasdasd'
      },
      employees: [{
        id: 'id',
        name: 'name',
        img: 'img'
      }],
      tags: [{
        id: 'id',
        name: 'name',
        status: Tag.StatusEnum.NEW,
        persisted: false
      }]
    }

    function create(html: string): JQuery {
      scope = <ISingleConsultationScope>rootScope.$new()
      scope.consultation = consultation
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    const bindings = {
      consultation: consultation
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

      inject(($rootScope: any, $compile: ng.ICompileService,
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

    it('should set isLinkActive to true', () => {
      const el = create(validHTML)
      const controller = el.controller('single-consultation')
      el.find('.btn.btn-success').triggerHandler('mouseover')
      expect(controller.isLinkActive).toBe(true)
    })

    it('should set isLinkActive to false', () => {
      const el = create(validHTML)
      const controller = el.controller('single-consultation')
      el.find('.btn.btn-success').triggerHandler('mouseover')
      el.find('.btn.btn-success').triggerHandler('mouseout')
      expect(controller.isLinkActive).toBe(false)
    })

    it('should call state go', () => {
      spyOn(state, 'go')
      component.goToProfile()
      expect(state.go).toHaveBeenCalled()
    })

  })
})
