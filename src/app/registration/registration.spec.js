describe('Unit tests: registration>', () => {
  describe('Testing Controller: RegistrationController', () => {

    var $scope
    var RegistrationController

    beforeEach(() => {
      module('profitelo.controller.registration')
      inject(($rootScope, $controller, $state) => {
        $scope = $rootScope.$new()
        RegistrationController = $controller('RegistrationController', {
          $scope: $scope,
          $rootScope: $rootScope,
          $state: $state
        })
      })
    })

    it('should exsist', ()=> {
      return expect(!!RegistrationController).toBe(true)
    })

  })
})
