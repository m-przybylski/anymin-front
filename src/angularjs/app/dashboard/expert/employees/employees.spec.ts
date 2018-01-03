import * as angular from 'angular'
import dashboardExpertEmployeesModule from './employees'
import {DashboardExpertEmployeesController} from './employees.controller';
import {ModalsService} from '../../../../common/services/modals/modals.service'
import {EmploymentApiMock, ServiceApiMock} from 'profitelo-api-ng/api/api';
import {GetProfileDetailsWithEmployments, GetInvitation} from 'profitelo-api-ng/model/models';
import {httpCodes} from '../../../../common/classes/http-codes'
import {IRootScopeService} from '../../../../common/services/root-scope/root-scope.service';

describe('Unit tests: dashboardExpertEmployeesController >', () => {
  describe('Testing Controller: dashboardExpertEmployeesController', () => {

    let dashboardExpertEmployeesController: DashboardExpertEmployeesController
    let employmentApiMock: EmploymentApiMock
    let $httpBackend: ng.IHttpBackendService
    let serviceApiMock: ServiceApiMock
    let $log: ng.ILogService
    let rootScope: ng.IRootScopeService
    let $q: ng.IQService

    const expertEmployees = {
      employees: []
    }

    const userService = jasmine.createSpyObj('userService', ['getUser'])

    beforeEach(() => {
      angular.mock.module(dashboardExpertEmployeesModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
    }))

    beforeEach(() => {
      inject(($rootScope: IRootScopeService,
              $controller: ng.IControllerService,
              _$state_: ng.ui.IStateService,
              _EmploymentApiMock_: EmploymentApiMock,
              _$httpBackend_: ng.IHttpBackendService,
              _ServiceApiMock_: ServiceApiMock,
              _$log_: ng.ILogService,
              _$q_: ng.IQService) => {

        employmentApiMock = _EmploymentApiMock_
        $httpBackend = _$httpBackend_
        serviceApiMock = _ServiceApiMock_
        $log = _$log_
        $q = _$q_
        rootScope = $rootScope

        userService.getUser.and.callFake(() => $q.resolve({id: 'someId'}))
        dashboardExpertEmployeesController =
          $controller(DashboardExpertEmployeesController, {
            expertEmployees,
            $state: _$state_,
            $scope: $rootScope.$new(),
            employmentApiMock,
            serviceApiMock,
            $log,
            userService
          })
        dashboardExpertEmployeesController.$onInit()
        $rootScope.$digest()
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
      employmentApiMock.getEmployeesRoute(httpCodes.ok, <GetProfileDetailsWithEmployments[]>[{
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
      dashboardExpertEmployeesController.onDeleteEmploymentsCallback()
      expect(dashboardExpertEmployeesController.areEmployees).toBe(true)
    })

    it('should be some pending invitations after delete one', () => {
      const date = new Date
      serviceApiMock.getProfileServicesRoute(httpCodes.ok, 'someId', [{
        id: 'someId',
        ownerId: 'ownerId',
        name: 'name',
        description: 'desc',
        price: {
          amount: 123,
          currency: 'PLN'
        },
        rating: 123,
        usageCounter: 123,
        usageDurationInSeconds: 123,
        language: 'pl',
        isSuspended: false,
        createdAt: 123
      }])
      serviceApiMock.postServiceInvitationsRoute(httpCodes.ok, [{
        service: {
          id: 'someId',
          ownerId: 'ownerId',
          name: 'name',
          description: 'desc',
          price: {
            amount: 123,
            currency: 'PLN'
          },
          rating: 123,
          usageCounter: 123,
          usageDurationInSeconds: 123,
          language: 'pl',
          isSuspended: false,
          createdAt: 123
        },
        invitations: [{
          id: 'invitationId',
          serviceId: 'someId',
          serviceName: 'serviceName',
          serviceOwnerId: 'serviceOwnerId',
          email: 'test@test.pl',
          employeeId: 'employeeId',
          status: GetInvitation.StatusEnum.NEW,
          createdAt: date,
          updatedAt: date
        },
        {
          id: 'invitationId2',
          serviceId: 'someId2',
          serviceName: 'serviceName2',
          serviceOwnerId: 'serviceOwnerId2',
          email: 'test2@test.pl',
          employeeId: 'employeeId2',
          status: GetInvitation.StatusEnum.NEW,
          createdAt: date,
          updatedAt: date
        }]
      }])
      dashboardExpertEmployeesController.getServicesInvitations()
      $httpBackend.flush()
      dashboardExpertEmployeesController.onDeleteInvitationsCallback()
      expect(dashboardExpertEmployeesController.arePendingInvitations).toBe(true)
    })

    it('should get get profiles with employments', () => {
      employmentApiMock.getEmployeesRoute(httpCodes.ok, <GetProfileDetailsWithEmployments[]>[{
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
    })

    it('should log error when get get profiles with employments failed', () => {
      spyOn($log, 'error')
      employmentApiMock.getEmployeesRoute(httpCodes.notFound, <GetProfileDetailsWithEmployments[]>[])
      dashboardExpertEmployeesController.getProfilesWithEmployments()
      $httpBackend.flush()
      expect($log.error).toHaveBeenCalled()
    })

    it('should log error when get profile services failed', () => {
      spyOn($log, 'error')
      serviceApiMock.getProfileServicesRoute(httpCodes.notFound, 'someId', <any>{})
      dashboardExpertEmployeesController.getServicesInvitations()
      $httpBackend.flush()
      expect($log.error).toHaveBeenCalled()
    })

    it('should log error when get service invitations failed', () => {
      spyOn($log, 'error')
      serviceApiMock.getProfileServicesRoute(httpCodes.ok, 'someId', [{
        id: 'id',
        ownerId: 'ownerId',
        name: 'name',
        description: 'desc',
        price: {
          amount: 123,
          currency: 'PLN'
        },
        rating: 123,
        usageCounter: 123,
        usageDurationInSeconds: 123,
        language: 'pl',
        isSuspended: false,
        createdAt: 123
      }])
      serviceApiMock.postServiceInvitationsRoute(httpCodes.notFound)
      dashboardExpertEmployeesController.getServicesInvitations()
      $httpBackend.flush()
      expect($log.error).toHaveBeenCalled()
    })

    it('should group pending invitations', () => {
      const date = new Date
      serviceApiMock.getProfileServicesRoute(httpCodes.ok, 'someId', [{
        id: 'someId',
        ownerId: 'ownerId',
        name: 'name',
        description: 'desc',
        price: {
          amount: 123,
          currency: 'PLN'
        },
        rating: 123,
        usageCounter: 123,
        usageDurationInSeconds: 123,
        language: 'pl',
        isSuspended: false,
        createdAt: 123
      }])
      serviceApiMock.postServiceInvitationsRoute(httpCodes.ok, [{
        service: {
          id: 'someId',
          ownerId: 'ownerId',
          name: 'name',
          description: 'desc',
          price: {
            amount: 123,
            currency: 'PLN'
          },
          rating: 123,
          usageCounter: 123,
          usageDurationInSeconds: 123,
          language: 'pl',
          isSuspended: false,
          createdAt: 123
        },
        invitations: [{
          id: 'invitationId',
          serviceId: 'someId',
          serviceName: 'serviceName',
          serviceOwnerId: 'serviceOwnerId',
          email: 'test@test.pl',
          employeeId: 'employeeId',
          status: GetInvitation.StatusEnum.NEW,
          createdAt: date,
          updatedAt: date
        }]
      }])
      dashboardExpertEmployeesController.getServicesInvitations()
      $httpBackend.flush()
      expect(dashboardExpertEmployeesController.pendingInvitations).toEqual([[{
        id: 'invitationId',
        serviceId: 'someId',
        serviceName: 'serviceName',
        serviceOwnerId: 'serviceOwnerId',
        email: 'test@test.pl',
        employeeId: 'employeeId',
        status: GetInvitation.StatusEnum.NEW,
        createdAt: date,
        updatedAt: date
      }]])
    })

  })
})
