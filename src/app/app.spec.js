// profitelo
describe('Unit tests: app>', () => {
  describe('Testing Controller: AppController', () => {

    let $scope
    let AppController
    let _InterfaceLanguageService
    let _httpBackend
    let _state
    let _commonConfigData
    let _CommonConfig
    let _url = 'http://api.dev.profitelo.pl'
    let resourcesExpectations

    beforeEach(() => {
      module('profitelo')
      inject(($rootScope, $controller, $injector, _InterfaceLanguageService_) => {
        $scope = $rootScope.$new()

        _CommonConfig = $injector.get('CommonConfig')
        _httpBackend = $injector.get('$httpBackend')
        _state = $injector.get('$state')

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
          }
        }


      })
    })

    it('should exsist', ()=> {
      return expect(!!AppController).toBe(true)
    })

    it('should start logout action if not pending', () => {

      resourcesExpectations.Session.getSession.respond(200, {
        user: {
          apiKey: '123'
        }
      })

      spyOn(_state, 'go')

      resourcesExpectations.Session.deleteSession.respond(200)

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
