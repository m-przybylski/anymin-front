import * as angular from 'angular'
import {PasswordStrengthService} from './password-strength.service'

describe('Unit testing: profitelo.directives.password-strength-service >', function (): void {
  describe('for passwordStrengthService service >', function (): void {

    let passwordStrengthService: PasswordStrengthService

    beforeEach(function (): void {
      angular.mock.module('profitelo.services.password-strength')

      inject(($injector: ng.auto.IInjectorService) => {
        passwordStrengthService = $injector.get<PasswordStrengthService>('passwordStrengthService')
      })
    })

    it('should exist', function (): void {
      expect(true).toBeTruthy()
    })

  })
})
