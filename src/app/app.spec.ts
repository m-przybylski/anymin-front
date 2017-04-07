import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {ServiceApiMock, RatelApiMock, SessionApiMock} from 'profitelo-api-ng/api/api'
import {InterfaceLanguageService} from '../common/services/interface-language/interface-language.service'
import sessionModule from '../common/services/session/session'
import './app'
import {CommonConfig} from '../../generated_modules/common-config/common-config'

describe('Unit tests: app>', () => {
  describe('Testing Controller: AppComponentController', () => {

    let $scope: ng.IScope
    let AppController: any
    let _InterfaceLanguageService: InterfaceLanguageService

    let _httpBackend: ng.IHttpBackendService
    let _state: ng.ui.IStateService
    let _commonConfigData
    let _CommonConfig: CommonConfig
    let _RatelApiMock: RatelApiMock
    let _SessionApiMock: SessionApiMock
    let _ServiceApiMock: ServiceApiMock

    const sessionService = {
      logout: () => {
      },
      getSession: () => {
      }
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
      $provide.value('sessionService', sessionService)
    }))

    beforeEach(() => {
      angular.mock.module(sessionModule)
      angular.mock.module('profitelo')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService,
              $injector: ng.auto.IInjectorService, _InterfaceLanguageService_: InterfaceLanguageService,
              RatelApiMock: RatelApiMock, SessionApiMock: SessionApiMock, ServiceApiMock: ServiceApiMock,
              $q: ng.IQService) => {
        spyOn(sessionService, 'getSession').and.returnValue($q.resolve({}))

        $scope = $rootScope.$new()

        _CommonConfig = $injector.get<CommonConfig>('CommonConfig')
        _httpBackend = $injector.get<ng.IHttpBackendService>('$httpBackend')
        _state = $injector.get<ng.ui.IStateService>('$state')
        _RatelApiMock = RatelApiMock
        _SessionApiMock = SessionApiMock
        _ServiceApiMock = ServiceApiMock

        _commonConfigData = _CommonConfig.getAllData()

        AppController = $controller('AppComponentController', {
          $scope: $scope,
          $rootScope: $rootScope,
          sessionService: sessionService,
          InterfaceLanguageService: _InterfaceLanguageService_
        })

        _InterfaceLanguageService = _InterfaceLanguageService_

        _InterfaceLanguageService.setLanguage(_InterfaceLanguageService.getStartupLanguage())
      })
    })

    it('should exsist', () => {
      return expect(!!AppController).toBe(true)
    })

  })
})
