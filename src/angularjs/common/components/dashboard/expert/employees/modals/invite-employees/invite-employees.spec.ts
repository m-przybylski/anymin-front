import * as angular from 'angular'

import {IExpertInviteEmployeesControllerScope, ExpertInviteEmployeesController} from './invite-employees.controller'
import expertInviteEmployeesModule from './invite-employees'
import {ServiceApi, InvitationApiMock} from 'profitelo-api-ng/api/api';
import {UserService} from '../../../../../../services/user/user.service'
import {GetService, PostInvitations} from 'profitelo-api-ng/model/models';
import {httpCodes} from '../../../../../../classes/http-codes'

describe('Testing Controller: expertInviteEmployeesController', () => {

  let expertInviteEmployeesController: ExpertInviteEmployeesController
  let scope: IExpertInviteEmployeesControllerScope
  let $httpBackend: ng.IHttpBackendService
  let invitationApiMock: InvitationApiMock
  const uibModalInstance = {
    dismiss: (): void => {
    },
    close: (): void => {
    }
  }

  beforeEach(() => {
    angular.mock.module(expertInviteEmployeesModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
    $provide.value('userService', UserService)
    $provide.value('ServiceApi', ServiceApi)
  }))

  beforeEach(() => {
    inject(($rootScope: any,
            $controller: ng.IControllerService,
            _InvitationApiMock_: InvitationApiMock,
            _$httpBackend_: ng.IHttpBackendService) => {

      scope = <IExpertInviteEmployeesControllerScope>$rootScope.$new()
      $httpBackend = _$httpBackend_
      invitationApiMock = _InvitationApiMock_

      expertInviteEmployeesController = $controller(ExpertInviteEmployeesController, {
        $scope: scope,
        $uibModalInstance: uibModalInstance,
        invitationApiMock
      })
    })
  })

  it('should exists', () => expect(!!expertInviteEmployeesController).toBe(true))

  it('should uibModalInstance', () => {
    spyOn(uibModalInstance, 'dismiss')
    expertInviteEmployeesController.onModalClose()
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

  it('should data in invitation for be invalid', () => {
    expertInviteEmployeesController.invitationsInputValue = ['test@test.pl']
    const service: GetService = {
      id: 'id',
      ownerId: 'ownerId',
      name: 'name',
      description: 'desc',
      price: {
        amount: 123,
        currency: 'PLN'
      },
      isFreelance: false,
      language: 'pl',
      isSuspended: false,
      createdAt: new Date(123),
    }
    expertInviteEmployeesController.onSelectedServices(service, false)
    expertInviteEmployeesController.onSelectedServices(service, true)
    expertInviteEmployeesController.sendInvitations()
    expect(expertInviteEmployeesController.isSubmitted).toBe(true)
  })

  it('should send invitation', () => {
    scope.onModalCloseCallback = (): void => {}
    spyOn(expertInviteEmployeesController, 'onModalClose')
    spyOn(expertInviteEmployeesController, 'isFormValid').and.returnValue(true)
    invitationApiMock.postInvitationRoute(httpCodes.ok, <PostInvitations>{})
    expertInviteEmployeesController.sendInvitations()
    $httpBackend.flush()
    expect(expertInviteEmployeesController.onModalClose).toHaveBeenCalled()
  })

})
