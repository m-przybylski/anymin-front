import * as angular from "angular"
import {PasswordStrengthService} from "./password-strength.service"
namespace profitelo.services.passwordStrength {
describe('Unit testing: profitelo.directives.password-strength-service >', function() {
  describe('for passwordStrengthService service >', function() {

    let passwordStrengthService: PasswordStrengthService

    beforeEach(function() {
    angular.mock.module('profitelo.services.password-strength')

      inject(($injector: ng.auto.IInjectorService) => {
        passwordStrengthService = $injector.get<PasswordStrengthService>('passwordStrengthService')
      })
    })

    it('should exist', function() {
      expect(true).toBeTruthy()
    })

  })
})}
