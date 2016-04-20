describe('Unit tests: profitelo.controller.login.account>', () => {
  describe('Testing Controller: AccountFormController', () => {

    let scope
    let AccountFormController
    let AccountApi

    beforeEach(() => {
      module('profitelo.controller.login.account')
      module('apiUrl')
      inject(($rootScope, $controller, $state, $filter, $injector) => {
        scope = $rootScope.$new()
        AccountApi = $injector.get('AccountApi')
        AccountFormController = $controller('AccountFormController', {
          scope: $scope,
          $rootScope: $rootScope,
          $state: $state,
          AccountApi: AccountApi
        })



      })
    })

    it('should exsist', ()=> {
       expect(!!AccountFormController).toBe(true)
    })

  })
})