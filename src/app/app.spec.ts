namespace profitelo.app {
  import IInterfaceLanguageService = profitelo.services.interfaceLanguage.IInterfaceLanguageService
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService

  describe('Unit tests: app>', () => {
    describe('Testing Controller: AppController', () => {

      let $scope: ng.IScope
      let AppController: any
      let _InterfaceLanguageService: IInterfaceLanguageService

      let _httpBackend: ng.IHttpBackendService
      let _state: ng.ui.IStateService
      let _commonConfigData
      let _CommonConfig: ICommonConfig
      let resourcesExpectations: any

      beforeEach(() => {
        angular.mock.module('profitelo')
        inject(($rootScope: IRootScopeService, $controller: ng.IControllerService,
                $injector: ng.auto.IInjectorService, _InterfaceLanguageService_: IInterfaceLanguageService) => {
          $scope = $rootScope.$new()

          _CommonConfig = $injector.get<ICommonConfig>('CommonConfig')
          _httpBackend = $injector.get<ng.IHttpBackendService>('$httpBackend')
          _state = $injector.get<ng.ui.IStateService>('$state')

          _commonConfigData = _CommonConfig.getAllData()

          AppController = $controller('AppController', {
            $scope: $scope,
            $rootScope: $rootScope,
            InterfaceLanguageService: _InterfaceLanguageService_
          })

          _InterfaceLanguageService = _InterfaceLanguageService_

          _InterfaceLanguageService.setLanguage(_InterfaceLanguageService.getStartupLanguage())

          resourcesExpectations = {
            Session: {
              deleteSession: _httpBackend.when('DELETE', _commonConfigData.urls['backend'] + '/session'),
              getSession: _httpBackend.when('GET', _commonConfigData.urls['backend'] + '/session')
            },
            ServiceApi: {
              getProfileServices: _httpBackend.when('GET', _commonConfigData.urls['backend'] + '/services/profile')
            },
            RatelApi: {
              getRatelAuthConfig: _httpBackend.when('GET', _commonConfigData.urls['backend'] + '/ratel/config')
            }
          }
        })
      })

      it('should exsist', ()=> {
        return expect(!!AppController).toBe(true)
      })

      it('should start logout action if not pending', () => {

        resourcesExpectations.RatelApi.getRatelAuthConfig.respond(200, {})

        resourcesExpectations.Session.getSession.respond(200, {
          user: {
            apiKey: '123'
          }
        })

        spyOn(_state, 'go')

        resourcesExpectations.Session.deleteSession.respond(200)
        resourcesExpectations.ServiceApi.getProfileServices.respond(200)

        AppController.logout()
        _httpBackend.flush()
        expect(_state.go).toHaveBeenCalledWith('app.login.account')
      })

      it('should not start logout action if pending', () => {

        AppController.isPending = true
        spyOn(_state, 'go')
        AppController.logout()
        expect(_state.go).not.toHaveBeenCalledWith('app.login.account')
      })

    })
  })
}
