describe('Unit testing: profitelo.services.login-state >', function () {
  describe('for loginStateService service >', function () {

    let loginStateService: any = null

    beforeEach(function () {
      angular.mock.module('profitelo.services.login-state')

      inject(($injector) => {
        loginStateService = $injector.get('loginStateService')
      })

    })

    it('should have a dummy test', function () {
      expect(true).toBeTruthy()
    })

    it('should contain empty account object', function () {

      let _account = {
        phoneNumber: {
          prefix: null,
          number: null
        },
        password: ''
      }

      expect(loginStateService.getAccountObject()).toEqual(_account)

    })

    it('should contain change default account object', function () {

      let _account = {
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



