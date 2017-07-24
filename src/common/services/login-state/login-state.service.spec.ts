import * as angular from 'angular'

describe('Unit testing: profitelo.services.login-state >', function (): void {
  describe('for loginStateService service >', function (): void {

    let loginStateService: any = null

    beforeEach(function (): void {
      angular.mock.module('profitelo.services.login-state')

      inject(($injector: ng.auto.IInjectorService) => {
        loginStateService = $injector.get('loginStateService')
      })

    })

    it('should have a dummy test', function (): void {
      expect(true).toBeTruthy()
    })

    it('should contain empty account object', function (): void {

      const _account = {
        phoneNumber: {
          prefix: null,
          number: null
        },
        password: ''
      }

      expect(loginStateService.getAccountObject()).toEqual(_account)

    })

    it('should contain change default account object', function (): void {

      const _account = {
        phoneNumber: {
          prefix: '+45',
          number: '2345676543'
        },
        password: ''
      }

      loginStateService.setAccountObject(_account)

      expect(loginStateService.getAccountObject()).toEqual(_account)

    })

  })
})
