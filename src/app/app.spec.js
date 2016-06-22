// profitelo
describe('Unit tests: app>', () => {
  describe('Testing Controller: AppController', () => {

    let $scope
    let AppController
    let _InterfaceLanguageService
    let _httpBackend
    let _state

    let _url = 'http://api.dev.profitelo.pl'

    beforeEach(() => {
      module('profitelo')
      inject(($rootScope, $controller, $injector, _InterfaceLanguageService_) => {
        $scope = $rootScope.$new()

        _httpBackend = $injector.get('$httpBackend')
        _state = $injector.get('$state')
        
        AppController = $controller('AppController', {
          $scope: $scope,
          $rootScope: $rootScope,
          InterfaceLanguageService: _InterfaceLanguageService_
        })
        _InterfaceLanguageService = _InterfaceLanguageService_
        
        _InterfaceLanguageService.setLanguage(_InterfaceLanguageService.getStartupLanguage())
      })
    })

    it('should exsist', ()=> {
      return expect(!!AppController).toBe(true)
    })

    it('should start logout action if not pending', () => {

      _httpBackend.when('GET', _url + '/session').respond(200, {
        user: {
          apiKey: '123'
        }
      })

      spyOn(_state, 'go')
      let session = _httpBackend.when('DELETE', _url + '/session')

      session.respond(200)

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
