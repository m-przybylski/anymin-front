import * as angular from 'angular'
import {ServiceApiMock, RatelApiMock, SessionApiMock} from 'profitelo-api-ng/api/api'
import {InterfaceLanguageService} from '../common/services/interface-language/interface-language.service'
import {IRootScopeService} from '../common/services/root-scope/root-scope.service';
import {angularjsModule} from './app.module';
import {StateService} from '@uirouter/angularjs';
import loggerMockModule from '../common/services/logger/logger.mock';

describe('Unit tests: app>', () => {
  describe('Testing Controller: AppComponentController', () => {

    let $scope: ng.IScope
    let AppController: any
    let _InterfaceLanguageService: InterfaceLanguageService

    let _httpBackend: ng.IHttpBackendService
    let _state: StateService
    let _RatelApiMock: RatelApiMock
    let _SessionApiMock: SessionApiMock
    let _ServiceApiMock: ServiceApiMock

    const sessionServiceWrapper = {
      logout: (): void => {
      },
      getSession: (): void => {
      }
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
      $provide.value('sessionServiceWrapper', sessionServiceWrapper)
    }))

    beforeEach(() => {
      angular.mock.module(angularjsModule.name);
      angular.mock.module(loggerMockModule);
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService,
              $injector: ng.auto.IInjectorService, _InterfaceLanguageService_: InterfaceLanguageService,
              RatelApiMock: RatelApiMock, SessionApiMock: SessionApiMock, ServiceApiMock: ServiceApiMock,
              $q: ng.IQService) => {
        spyOn(sessionServiceWrapper, 'getSession').and.returnValue($q.resolve({}))

        $scope = $rootScope.$new()

        _httpBackend = $injector.get<ng.IHttpBackendService>('$httpBackend')
        _state = $injector.get<StateService>('$state')
        _RatelApiMock = RatelApiMock
        _SessionApiMock = SessionApiMock
        _ServiceApiMock = ServiceApiMock

        AppController = $controller('AppComponentController', {
          $scope: $scope,
          $rootScope: $rootScope,
          sessionServiceWrapper: sessionServiceWrapper,
          InterfaceLanguageService: _InterfaceLanguageService_
        })

        _InterfaceLanguageService = _InterfaceLanguageService_

        _InterfaceLanguageService.setLanguage(_InterfaceLanguageService.getStartupLanguage())
      })
    })

    afterEach(() => {
      jasmine.clock().uninstall();
    })

    it('should exsist', () => {
      return expect(!!AppController).toBe(true)
    })

  })
})
