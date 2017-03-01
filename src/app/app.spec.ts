namespace profitelo.app {

  import IInterfaceLanguageService = profitelo.services.interfaceLanguage.IInterfaceLanguageService
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import IRatelApiMock = profitelo.api.IRatelApiMock
  import ISessionApiMock = profitelo.api.ISessionApiMock
  import IServiceApiMock = profitelo.api.IServiceApiMock

  describe('Unit tests: app>', () => {
    describe('Testing Controller: AppController', () => {

      let $scope: ng.IScope
      let AppController: any
      let _InterfaceLanguageService: IInterfaceLanguageService

      let _httpBackend: ng.IHttpBackendService
      let _state: ng.ui.IStateService
      let _commonConfigData
      let _CommonConfig: ICommonConfig
      let _RatelApiMock: IRatelApiMock
      let _SessionApiMock: ISessionApiMock
      let _ServiceApiMock: IServiceApiMock

      const sessionService = {
        logout: () => {},
        getSession: () => {}
      }

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', "awesomeUrl")
        $provide.value('sessionService', sessionService)
      }))

      beforeEach(() => {
        angular.mock.module('profitelo.services.session')
        angular.mock.module('profitelo')
        inject(($rootScope: IRootScopeService, $controller: ng.IControllerService,
                $injector: ng.auto.IInjectorService, _InterfaceLanguageService_: IInterfaceLanguageService,
                RatelApiMock: IRatelApiMock, SessionApiMock: ISessionApiMock, ServiceApiMock: IServiceApiMock,
                $q: ng.IQService) => {
          spyOn(sessionService, 'getSession').and.returnValue($q.resolve({}))

          $scope = $rootScope.$new()

          _CommonConfig = $injector.get<ICommonConfig>('CommonConfig')
          _httpBackend = $injector.get<ng.IHttpBackendService>('$httpBackend')
          _state = $injector.get<ng.ui.IStateService>('$state')
          _RatelApiMock = RatelApiMock
          _SessionApiMock = SessionApiMock
          _ServiceApiMock = ServiceApiMock

          _commonConfigData = _CommonConfig.getAllData()

          AppController = $controller('AppController', {
            $scope: $scope,
            $rootScope: $rootScope,
            sessionService: sessionService,
            InterfaceLanguageService: _InterfaceLanguageService_
          })

          _InterfaceLanguageService = _InterfaceLanguageService_

          _InterfaceLanguageService.setLanguage(_InterfaceLanguageService.getStartupLanguage())
        })
      })

      it('should exsist', ()=> {
        return expect(!!AppController).toBe(true)
      })

      it('should start logout action if not pending', inject(($q: ng.IQService) => {

        _RatelApiMock.getRatelAuthConfigRoute(200)
        _SessionApiMock.checkRoute(200, <any>{
          user: {
            apiKey: '123'
          }
        })

        spyOn(_state, 'go')
        spyOn(sessionService, 'logout').and.returnValue($q.resolve())

        AppController.logout()
        $scope.$digest()

        expect(_state.go).toHaveBeenCalledWith('app.home')
        expect(sessionService.logout).toHaveBeenCalled()
      }))

      it('should not start logout action if pending', () => {

        AppController.isPending = true
        spyOn(_state, 'go')
        AppController.logout()
        expect(_state.go).not.toHaveBeenCalledWith('app.login.account')
      })

    })
  })
}
