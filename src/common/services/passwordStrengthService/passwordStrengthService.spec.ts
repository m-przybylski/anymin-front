describe('Unit testing: profitelo.directives.password-strength-service >', function() {
  describe('for passwordStrengthService service >', function() {

    let passwordStrengthService  = null

    beforeEach(function() {
    angular.mock.module('profitelo.services.password-strength-service')

      inject(($injector) => {
        passwordStrengthService = $injector.get('passwordStrengthService')
      })
    })

    it('should exist', function() {
      expect(true).toBeTruthy()
    })

  })
})