import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import singleServiceModule, {ISingleServiceComponentBindings} from './single-service'
import {SingleServiceComponentController} from './single-service.controller'
import {GetExpertServiceDetails, Tag} from 'profitelo-api-ng/model/models'
import userModule from '../../../../../services/user/user'
import {UserService} from '../../../../../services/user/user.service'
import {ModalsService} from '../../../../../services/modals/modals.service'
import {EmploymentApiMock} from 'profitelo-api-ng/api/api';
import {ErrorHandlerService} from '../../../../../services/error-handler/error-handler.service';
import {httpCodes} from '../../../../../classes/http-codes'

describe('Unit testing: profitelo.components.dashboard.expert.manage-profile.single-service', () =>
  describe('for singleService >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: SingleServiceComponentController
    let serviceDetails: GetExpertServiceDetails
    let modalsService: ModalsService
    let $httpBackend: ng.IHttpBackendService
    let EmploymentApiMock: EmploymentApiMock
    let errorHandler: ErrorHandlerService

    const userService: UserService  = <UserService>{
      getUser: {}
    }

    serviceDetails = {
      service: {
        id: 'id',
        ownerId: 'ownerId',
        name: 'name',
        description: 'description',
        price: {
          amount: 123,
          currency: 'PLN'
        },
        rating: 123,
        usageCounter: 123,
        usageDurationInSeconds: 123,
        isSuspended: false,
        language: 'pl',
        createdAt: 123
      },
      ownerProfile: {
        id: 'id',
        isActive: false,
        expertDetails: {
          name: 'name',
          avatar: 'avatar',
          description: 'desc',
          files: ['file'],
          links: ['link']
        }
      },
      tags: [{
        id: 'id',
        name: 'name',
        status: Tag.StatusEnum.NEW,
        persisted: false
      }]
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {

      angular.mock.module(singleServiceModule)
      angular.mock.module(userModule)

      inject(($rootScope: IRootScopeService,
              $compile: ng.ICompileService,
              $q: ng.IQService,
              _$componentController_: ng.IComponentControllerService,
              _modalsService_: ModalsService,
              _$httpBackend_: ng.IHttpBackendService,
              _EmploymentApiMock_: EmploymentApiMock,
              _errorHandler_: ErrorHandlerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        modalsService = _modalsService_
        $httpBackend = _$httpBackend_
        EmploymentApiMock = _EmploymentApiMock_
        errorHandler = _errorHandler_

        spyOn(userService, 'getUser').and.returnValue($q.resolve({}))
        compile = $compile
        const injectors = {
          $scope: rootScope,
          modalService: modalsService,
          $document: document,
          userService
        }

        const bindings: ISingleServiceComponentBindings = {
          onModalClose: (): void => {},
          serviceDetails
        }

        component = componentController<SingleServiceComponentController, {}>('singleService', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should open modal form service', inject(() => {
      spyOn(modalsService, 'createServiceFormModal')
      component.openServiceFormModal()
      expect(modalsService.createServiceFormModal).toHaveBeenCalled()
    }))

    it('should show error when delete employment failed', () => {
      component.isOwnerOfService = false
      spyOn(window, 'confirm').and.returnValue(true)
      spyOn(errorHandler, 'handleServerError')
      EmploymentApiMock.deleteEmploymentForServiceRoute(httpCodes.badRequest, 'id')
      component.suspendProvideService()
      $httpBackend.flush()
      expect(errorHandler.handleServerError).toHaveBeenCalled()
    })
  })
)
