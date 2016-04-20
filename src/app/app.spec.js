// profitelo
describe('Unit tests: app>', () => {
  describe('Testing Controller: AppController', () => {

    let $scope
    let AppController
    let _InterfaceLanguageService

    beforeEach(() => {
      module('profitelo')
      inject(($rootScope, $controller, _InterfaceLanguageService_) => {
        $scope = $rootScope.$new()
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

  })
})
