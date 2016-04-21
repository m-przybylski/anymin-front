describe('Unit tests: profitelo.controller.login.forgot-password >', () => {
  describe('Testing Controller: ForgotPasswordController', () => {

    let scope
    let ForgotPasswordController

    let _url = 'awesomeUrl'

    let account = {
      accountObject: {
        phoneNumber: {
          prefix: '+45',
          number: '456543123'
        },
        password: ''
      },
      sessionId: '123fsdf'
    }


    let $state = {
      go: () => {

      }
    }

    beforeEach(() => {
      module('profitelo.controller.login.forgot-password')
      module('profitelo.swaggerResources.definitions')
      inject(($rootScope, $controller) => {
        scope = $rootScope.$new()

        ForgotPasswordController = $controller('ForgotPasswordController', {
          $state: $state,
          account: account

        })
      })
    })

    it('should exsist', ()=> {
      expect(!!ForgotPasswordController).toBe(true)
    })




  })
})
