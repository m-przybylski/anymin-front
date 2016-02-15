describe('Unit testing: profitelo.modules.authorization', () => {
  return describe('for profitelo.modules.authorization module >', () => {

    var
      _authorization          = null,
      _$http                  = null,
      _$httpBackend           = null,
      _CommonSettingsService  = null,
      _HellojsService         = null

    var
      registrationTokenGET    = null,
      registrationGET         = null,
      sessionPOST             = null

    var
      token  = 'asdqwe123asczxc',
      apiKey = 'awesomeApiKey'


    beforeEach(() => {
      module('templates-module')
      module('profitelo.modules.authorization')

      inject((_AuthorizationService_, _HellojsService_, _CommonSettingsService_, _$http_, _$httpBackend_) => {
        _authorization          = _AuthorizationService_
        _$http                  = _$http_
        _$httpBackend           = _$httpBackend_
        _HellojsService         = _HellojsService_
        _CommonSettingsService  = _CommonSettingsService_
      })

      registrationTokenGET  = _$httpBackend.when('GET', _CommonSettingsService.get('apiUrl')+'/registration/'+token)
      registrationGET       = _$httpBackend.when('GET', _CommonSettingsService.get('apiUrl')+'/registration')
      sessionPOST           = _$httpBackend.when('POST', _CommonSettingsService.get('apiUrl')+'/session')
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should exist', () => {
      expect(_authorization).toBeDefined(true)
    })

    it('should setApiKeyHeader', () => {
      _authorization.setApiKeyHeader(apiKey)
      expect(_$http.defaults.headers.common['X-Api-Key']).toBe(apiKey)
    })

    it('should check token', () => {
      registrationGET.respond(200, {})
      registrationTokenGET.respond(200, {apiKey:apiKey})
      _authorization.checkToken({token:token})
      _$httpBackend.flush()
      expect(_$http.defaults.headers.common['X-Api-Key']).toBe(apiKey)
    })

    it('should fail while check token', () => {
      registrationTokenGET.respond(400, {})
      _authorization.checkToken({token:token})
      _$httpBackend.flush()
    })

    it('should login user', () => {
      sessionPOST.respond(200, {apiKey: apiKey})
      _authorization.login({})
      _$httpBackend.flush()
      expect(_$http.defaults.headers.common['X-Api-Key']).toBe(apiKey)
    })

    it('should fail while login', () => {
      sessionPOST.respond(400, {})
      _authorization.login({})
      _$httpBackend.flush()
    })

    // it('should login social', () => {
    //
    //  _authorization.loginSocial('fejsbuk', () => {
    //
    //  }, () => {
    //
    //  })
    //  _$httpBackend.flush()
    // })


  })
})
