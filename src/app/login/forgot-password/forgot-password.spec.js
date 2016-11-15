describe('Unit tests: profitelo.controller.login.forgot-password >', () => {
  describe('Testing Controller: ForgotPasswordController', () => {

    let scope
    let ForgotPasswordController
    let _RecoverPasswordApi
    const _url = 'awesomeUrl'

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

    const $state = {
      go: _ => _
    }

    beforeEach(module(($provide) => {
      $provide.value('apiUrl', _url)
    }))

    beforeEach(() => {
      module('profitelo.controller.login.forgot-password')
      module('profitelo.swaggerResources.definitions')
      module('profitelo.services.pro-top-waiting-loader-service')
      inject(($rootScope, $controller, _RecoverPasswordApi_, _proTopWaitingLoaderService_) => {
        scope = $rootScope.$new()

        ForgotPasswordController = $controller('ForgotPasswordController', {
          $state: $state,
          account: account,
          RecoverPasswordApi: _RecoverPasswordApi_,
          proTopWaitingLoaderService: _proTopWaitingLoaderService_
        })

        _RecoverPasswordApi = _RecoverPasswordApi_
      })
    })

    it('should exsist', ()=> {
      expect(!!ForgotPasswordController).toBe(true)
    })
  })
})
