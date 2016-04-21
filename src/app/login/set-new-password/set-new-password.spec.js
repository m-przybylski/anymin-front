describe('Unit tests: profitelo.controller.login.set-new-password >', () => {
  describe('Testing Controller: SetNewPasswordController', () => {

    let scope
    let SetNewPasswordController

    let _url = 'awesomeUrl'

    let validateToken = {
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
      module('profitelo.controller.login.set-new-password')
      module('profitelo.swaggerResources.definitions')
      inject(($rootScope, $controller, _passwordStrengthService_) => {
        scope = $rootScope.$new()

        SetNewPasswordController = $controller('SetNewPasswordController', {
          $state: $state,
          validateToken: validateToken,
          passwordStrengthService: _passwordStrengthService_
        })
      })
    })

    it('should exsist', ()=> {
      expect(!!SetNewPasswordController).toBe(true)
    })




  })
})
