import * as angular from 'angular'

import dashboardExpertManageProfileModule from './manage-profile'
import {DashboardExpertManageProfileController} from './manage-profile.controller'
import {ViewsApiMock} from 'profitelo-api-ng/api/api'
import {httpCodes} from '../../../../common/classes/http-codes'
import {IRootScopeService} from '../../../../common/services/root-scope/root-scope.service';

describe('Unit tests: dashboardExpertManageProfile >', () => {
  describe('Testing Controller: dashboardExpertManageProfile', () => {
    const userService = jasmine.createSpyObj('userService', ['getUser'])
    const createController =
      ($controller: ng.IControllerService, injectors: any): DashboardExpertManageProfileController =>
        $controller(DashboardExpertManageProfileController, injectors)

    beforeEach(() => {
      angular.mock.module(dashboardExpertManageProfileModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesome')
    }))

    beforeEach(() => {
      inject(($rootScope: IRootScopeService,
              $q: ng.IQService,
              $controller: ng.IControllerService,
              _$state_: ng.ui.IStateService) => {
        userService.getUser.and.callFake(() => $q.resolve({id: 'someId'}))
        const dashboardExpertManageProfileController = createController($controller, {
          $state: _$state_,
          $scope: $rootScope.$new(),
          userService
        })
        expect(!!dashboardExpertManageProfileController).toBe(true)
      })
    })

    it('should get expert profile', () => {
      inject(($q: ng.IQService, ViewsApiMock: ViewsApiMock, $httpBackend: ng.IHttpBackendService,
              $rootScope: IRootScopeService, $controller: ng.IControllerService,)=> {
        const mockResponse = {
          profile: {
          id: 'someId',
          isActive: true,
          expertDetails: {
            name: 'Marek',
            avatar: '1234234234'
          }
        },
        services: [],
        isFavourite: true
        }
        userService.getUser.and.callFake(() => $q.resolve({id: 'someId'}))
        const dashboardExpertManageProfileController = createController($controller, {
          $scope: $rootScope.$new(),
          ViewsApiMock,
          userService
        })
        ViewsApiMock.getWebExpertProfileRoute(httpCodes.ok, 'someId', <any>mockResponse)
        dashboardExpertManageProfileController.getExpertProfile()
        $httpBackend.flush()
        expect(dashboardExpertManageProfileController.expertAvatar).toEqual(mockResponse.profile.expertDetails.avatar)
        expect(dashboardExpertManageProfileController.expertName).toEqual(mockResponse.profile.expertDetails.name)
  })
})

    it('should get organization profile', () => {
      inject(($q: ng.IQService, ViewsApiMock: ViewsApiMock, $httpBackend: ng.IHttpBackendService,
              $rootScope: IRootScopeService, $controller: ng.IControllerService,)=> {
        const mockResponse = {
          profile: {
            id: 'someId',
            isActive: true,
            organizationDetails: {
              name: 'MirexPOLCOM',
              logo: '1234234234'
            }
          },
          services: [],
          isFavourite: true
        }
        userService.getUser.and.callFake(() => $q.resolve({id: 'someId'}))
        const dashboardExpertManageProfileController = createController($controller, {
          $scope: $rootScope.$new(),
          ViewsApiMock,
          userService
        })
        ViewsApiMock.getWebExpertProfileRoute(httpCodes.ok, 'someId', <any>mockResponse)
        dashboardExpertManageProfileController.getExpertProfile()
        $httpBackend.flush()
        expect(dashboardExpertManageProfileController.organizationLogo)
          .toEqual(mockResponse.profile.organizationDetails.logo)
        expect(dashboardExpertManageProfileController.organizationName)
          .toEqual(mockResponse.profile.organizationDetails.name)
      })
    })

    it('should get organization and expert profiles', () => {
      inject(($q: ng.IQService, ViewsApiMock: ViewsApiMock, $httpBackend: ng.IHttpBackendService,
              $rootScope: IRootScopeService, $controller: ng.IControllerService,)=> {
        const mockResponse = {
          profile: {
            id: 'someId',
            isActive: true,
            expertDetails: {
              name: 'Marek',
              avatar: '1234234234'
            },
            organizationDetails: {
              name: 'MirexPOLCOM',
              logo: '1234234234'
            }
          },
          services: [],
          isFavourite: true
        }
        userService.getUser.and.callFake(() => $q.resolve({id: 'someId'}))
        const dashboardExpertManageProfileController = createController($controller, {
          $scope: $rootScope.$new(),
          ViewsApiMock,
          userService
        })
        ViewsApiMock.getWebExpertProfileRoute(httpCodes.ok, 'someId', <any>mockResponse)
        dashboardExpertManageProfileController.getExpertProfile()
        $httpBackend.flush()
        expect(dashboardExpertManageProfileController.expertAvatar).toEqual(mockResponse.profile.expertDetails.avatar)
        expect(dashboardExpertManageProfileController.expertName).toEqual(mockResponse.profile.expertDetails.name)
        expect(dashboardExpertManageProfileController.organizationLogo)
        .toEqual(mockResponse.profile.organizationDetails.logo)
        expect(dashboardExpertManageProfileController.organizationName)
        .toEqual(mockResponse.profile.organizationDetails.name)
      })
    })

    it('should display error and call error handler service', () => {
      inject(($q: ng.IQService, ViewsApiMock: ViewsApiMock, $httpBackend: ng.IHttpBackendService,
              $rootScope: IRootScopeService, $controller: ng.IControllerService,)=> {

        userService.getUser.and.callFake(() => $q.resolve({id: 'someId'}))
        const errorHandler = jasmine.createSpyObj('errorHandler', ['handleServerError'])
        const dashboardExpertManageProfileController = createController($controller, {
          $scope: $rootScope.$new(),
          ViewsApiMock,
          userService,
          errorHandler
        })
        ViewsApiMock.getWebExpertProfileRoute(httpCodes.badRequest, 'someId')
        dashboardExpertManageProfileController.getExpertProfile()
        $httpBackend.flush()
        expect(dashboardExpertManageProfileController.isError).toBeTruthy()
        expect(errorHandler.handleServerError).toHaveBeenCalled()
      })
    })

    it('should open edit expert profile modal', () => {
      inject(($q: ng.IQService, ViewsApiMock: ViewsApiMock, $rootScope: IRootScopeService,
              $httpBackend: ng.IHttpBackendService, $controller: ng.IControllerService)=> {

        userService.getUser.and.callFake(() => $q.resolve({id: 'someId'}))
        const modalsService = jasmine.createSpyObj('modalsService',
          ['createManageProfileEditProfileModal'])
        const mockResponse = {
          profile: {
            id: 'someId',
            isActive: true,
            expertDetails: {
              name: 'Marek',
              avatar: '1234234234'
            }
          },
          services: [],
          isFavourite: true
        }
        userService.getUser.and.callFake(() => $q.resolve({id: 'someId'}))
        const dashboardExpertManageProfileController = createController($controller, {
          $scope: $rootScope.$new(),
          ViewsApiMock,
          userService,
          modalsService
        })
        ViewsApiMock.getWebExpertProfileRoute(httpCodes.ok, 'someId', <any>mockResponse)
        dashboardExpertManageProfileController.getExpertProfile()
        $httpBackend.flush()
        dashboardExpertManageProfileController.editExpertProfile()
        expect(modalsService.createManageProfileEditProfileModal).toHaveBeenCalled()
      })
    })

  })
})

