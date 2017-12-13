import * as angular from 'angular'
import {AccountApi, AccountApiMock} from 'profitelo-api-ng/api/api'
import {TopAlertService} from '../../../common/services/top-alert/top-alert.service'
import {TopWaitingLoaderService} from '../../../common/services/top-waiting-loader/top-waiting-loader.service'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IFilterService} from '../../../common/services/filter/filter.service'
import './set-email'
import {httpCodes} from '../../../common/classes/http-codes'
import {LocalStorageWrapper} from '../../../common/classes/local-storage-wrapper/local-storage-wrapper'
import {Config} from '../../config';

describe('Unit tests: profitelo.controller.post-register.set-email>', () => {
  describe('Testing Controller: SetEmailController', () => {

    let scope: any
    let SetEmailController: any
    let _topWaitingLoaderService: TopWaitingLoaderService
    let _AccountApi: AccountApi
    let _topAlertService: TopAlertService
    let _AccountApiMock: AccountApiMock
    let _$httpBackend: ng.IHttpBackendService

    const _url = 'awesomeUrl'

    const user = {
      id: '123'
    }

    const $state = {
      go: (): void => {
      }
    }

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService): void {
      $provide.value('apiUrl', _url)
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.controller.post-register.set-email')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, $filter: IFilterService,
              _topWaitingLoaderService_: TopWaitingLoaderService, _AccountApi_: AccountApi,
              _topAlertService_: TopAlertService, _$httpBackend_: ng.IHttpBackendService,
              AccountApiMock: AccountApiMock) => {

        scope = $rootScope.$new()

        SetEmailController = $controller('SetEmailController', {
          $filter,
          $state,
          user,
          topWaitingLoaderService: _topWaitingLoaderService_,
          topAlertService: _topAlertService_,
          AccountApi: _AccountApi_
        })

        _AccountApiMock = AccountApiMock
        _$httpBackend = _$httpBackend_
        _topWaitingLoaderService = _topWaitingLoaderService_
        _AccountApi = _AccountApi_
        _topAlertService = _topAlertService_
      })
    })

    it('should exsist', () => {
      expect(!!SetEmailController).toBe(true)
    })

    if (!Config.isPlatformForExpert)
      it('should set new email', () => {
        spyOn($state, 'go')
        // FIXME
        _AccountApiMock.patchUpdateAccountRoute(200, user.id, <any>{})
        _AccountApiMock.getAccountEmailExistsRoute(400, 'email')
        SetEmailController.setNewEmail()
        _$httpBackend.flush()

        expect($state.go).toHaveBeenCalledWith('app.dashboard.client.favourites')
      })

    it('should handle bad requesnt while setting new email', () => {
      spyOn(_topAlertService, 'error')
      _AccountApiMock.patchUpdateAccountRoute(500, user.id)
      _AccountApiMock.getAccountEmailExistsRoute(400, 'email')
      SetEmailController.setNewEmail()
      _$httpBackend.flush()

      expect(_topAlertService.error).toHaveBeenCalledWith({message: 'INTERFACE.API_ERROR', timeout: 4})
    })

    it('should display error if email already exist', () => {
      _AccountApiMock.getAccountEmailExistsRoute(httpCodes.ok, 'email', {})
      SetEmailController.email = 'email'
      SetEmailController.setNewEmail()
      _$httpBackend.flush()

      expect(SetEmailController.emailExist).toBe(true)
    })

    it('should redirect user to invitation', () => {
      spyOn($state, 'go')
      spyOn(LocalStorageWrapper, 'getItem').and.returnValue(JSON.stringify({token: 'asdasdasd'}))
      _AccountApiMock.getAccountEmailExistsRoute(httpCodes.badRequest, 'email', {})
      _AccountApiMock.patchUpdateAccountRoute(httpCodes.ok, user.id, <any>{})
      SetEmailController.email = 'email'
      SetEmailController.setNewEmail()
      _$httpBackend.flush()
      console.log(LocalStorageWrapper.getItem('invitation'))

      expect($state.go).toHaveBeenCalled()
    })
  })
})
