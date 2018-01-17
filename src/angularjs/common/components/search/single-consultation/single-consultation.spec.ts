import * as angular from 'angular'
import './single-consultation'

import {Tag} from 'profitelo-api-ng/model/models';
import {RatelApiMock} from 'profitelo-api-ng/api/api';
import {StateService} from '@uirouter/angularjs'
import uiRouter from '@uirouter/angularjs'
import {IRootScopeService} from '../../../services/root-scope/root-scope.service';
import communicatorMockModule from '../../communicator/communicator.mock';
const {inject, module} = angular.mock;

describe('Unit testing:profitelo.components.search.single-consultation', () => {
  return describe('for single-consultation component >', () => {

    let rootScope: ng.IRootScopeService
    let componentController: any
    let component: any
    let _callService: any
    let state: StateService

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
        createdAt: new Date(123)
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

    const bindings = {
      consultation
    }

    const userService = {
      getUser: (): boolean => true
    }

    const callService = {
      callServiceId: (): void => {
      }
    }

    beforeEach(() => {
      module(communicatorMockModule)
      module(uiRouter)
      module('profitelo.components.search.single-consultation')
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
      $provide.value('callService', callService)
      $provide.value('userService', userService)
    }))

    beforeEach(() => {

      inject(($rootScope: IRootScopeService,
              _$componentController_: ng.IComponentControllerService, $q: ng.IQService, RatelApiMock: RatelApiMock) => {
        componentController = _$componentController_
        rootScope = $rootScope
        _callService = callService
        state = <StateService>{
          go: (_x: any): {} => {
            return {}
          }
        }
        RatelApiMock.getRatelAuthConfigRoute(200, undefined)

        spyOn(userService, 'getUser').and.callFake(() => $q.resolve({id: 'asdasdasd'}))

        component = componentController('singleConsultation', {
          $element: {},
          $scope: {},
          callService: _callService,
          $state: state,
          userService
        }, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should call state go', () => {
      spyOn(state, 'go')
      component.goToProfile()
      expect(state.go).toHaveBeenCalled()
    })

  })
})
