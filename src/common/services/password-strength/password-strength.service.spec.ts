namespace profitelo.services.passwordStrength {
describe('Unit testing: profitelo.directives.password-strength-service >', function() {
  describe('for passwordStrengthService service >', function() {

    let passwordStrengthService: IPasswordStrengthService

    beforeEach(function() {
    angular.mock.module('profitelo.services.password-strength')

      inject(($injector: ng.auto.IInjectorService) => {
        passwordStrengthService = $injector.get<IPasswordStrengthService>('passwordStrengthService')
      })
    })

    it('should exist', function() {
      expect(true).toBeTruthy()
    })

  })
})}
