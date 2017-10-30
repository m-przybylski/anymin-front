import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import dashboardExpertEmployeesModule from './employees'
import {DashboardExpertEmployeesController} from './employees.controller';
import {ModalsService} from '../../../../common/services/modals/modals.service'
import {EmploymentApiMock} from 'profitelo-api-ng/api/api';
import {GetProfileDetailsWithEmployments} from 'profitelo-api-ng/model/models';
import {UserService} from '../../../../common/services/user/user.service'

describe('Unit tests: dashboardExpertEmployeesController >', () => {
  describe('Testing Controller: dashboardExpertEmployeesController', () => {

    let dashboardExpertEmployeesController: DashboardExpertEmployeesController
    let employmentApiMock: EmploymentApiMock
    let $httpBackend: ng.IHttpBackendService

    const expertEmployees = {
      employees: []
    }

    const userService = {
      getUser: (): void => {}
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
      $provide.value('userService', UserService)
    }))

    beforeEach(() => {
      angular.mock.module(dashboardExpertEmployeesModule)

      inject(($rootScope: IRootScopeService,
              $controller: ng.IControllerService,
              _$state_: ng.ui.IStateService,
              _EmploymentApiMock_: EmploymentApiMock,
              _$httpBackend_: ng.IHttpBackendService) => {
        employmentApiMock = _EmploymentApiMock_
        $httpBackend = _$httpBackend_
        dashboardExpertEmployeesController =
          $controller(DashboardExpertEmployeesController, {
            expertEmployees,
            $state: _$state_,
            $scope: $rootScope.$new(),
            employmentApiMock,
            userService
          })
      })
    })

    it('should exists', () => {
      expect(!!dashboardExpertEmployeesController).toBe(true)
    })

    it('should open modal', inject((modalsService: ModalsService) => {
      spyOn(modalsService, 'createExpertInviteEmployeesModal')
      dashboardExpertEmployeesController.openInviteEmployeesModal()
      expect(modalsService.createExpertInviteEmployeesModal).toHaveBeenCalled()
    }))

    it('should be some employee after delete one', () => {
      dashboardExpertEmployeesController.profilesWithEmployments = [
        {
          expertProfile: {
            id: 'id',
            name: 'name',
            img: 'img'
          },
          employments: [{
            id: 'id',
            serviceId: 'id',
            profileId: 'id',
            createdAt: new Date()
          }]
        },
        {
          expertProfile: {
            id: 'id2',
            name: 'name2',
            img: 'img2'
          },
          employments: [{
            id: 'id2',
            serviceId: 'id2',
            profileId: 'id2',
            createdAt: new Date()
          }]
        }
      ]
      dashboardExpertEmployeesController.areEmployeesAfterDelete()
      expect(dashboardExpertEmployeesController.areEmployees).toBe(true)
    })

    it('should get get profiles with employments', inject(($q: ng.IQService) => {
      spyOn(userService, 'getUser').and.callFake(() => $q.resolve({user: {id: 'someId'}}))
      employmentApiMock.getEmployeesRoute(200, <GetProfileDetailsWithEmployments[]>[{
        expertProfile: {
          id: 'id',
          name: 'name',
          img: 'img'
        },
        employments: [{
          id: 'id',
          serviceId: 'id',
          profileId: 'id',
          createdAt: new Date()
        }]
      }])
      dashboardExpertEmployeesController.getProfilesWithEmployments()
      $httpBackend.flush()
      expect(dashboardExpertEmployeesController.areEmployees).toBe(true)
    }))

    it('should log error when get get profiles with employments failed',
      inject(($q: ng.IQService, $log: ng.ILogService) => {
      spyOn(userService, 'getUser').and.callFake(() => $q.resolve({user: {id: 'someId'}}))
      spyOn($log, 'error')
      employmentApiMock.getEmployeesRoute(500, <GetProfileDetailsWithEmployments[]>[])
      dashboardExpertEmployeesController.getProfilesWithEmployments()
      $httpBackend.flush()
      expect($log.error).toHaveBeenCalled()
    }))

  })
})
