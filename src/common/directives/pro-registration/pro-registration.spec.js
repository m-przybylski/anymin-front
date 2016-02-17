describe('Unit testing: profitelo.directive.pro-registration', () => {
  return describe('for pro-registration directive >', () => {

    var compile               = null,
      scope                   = null,
      _$httpBackend           = null,
      _$state                 = null,
      _CommonSettingsService  = null
    var validHTML = '<div data-pro-registration data-step1="step1"></div>'

    var registrationPOST = null,
      registrationGET  = null

    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.pro-registration')

      inject(($rootScope, $compile, _$httpBackend_, _$state_, CommonSettingsService) => {
        scope         = $rootScope.$new()
        compile       = $compile
        scope.step1   = true
        _$state       = _$state_
        _$httpBackend = _$httpBackend_
        _CommonSettingsService = CommonSettingsService


        $rootScope.registrationFooterData = {}


      })
      _$state.current.name = 'app.registration'

      registrationGET  = _$httpBackend.when('GET', _CommonSettingsService.get('apiUrl')+'/registration')
      .respond(200, {})

      registrationPOST =_$httpBackend.when('POST', _CommonSettingsService.get('apiUrl')+'/registration')
      .respond(200, {})


    })

    function create(html) {
      var elem = angular.element(html)
      var compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('compile the directive', () => {
      var el
      el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should not redirect while its first step', () => {
      var el
      el = create(validHTML)
      expect(el.isolateScope().vm.registrationMetaData.step1).toEqual(true)
    })

    it('should redirect to home if token is wrong', () =>{
      spyOn(_$state, 'go')

      registrationGET.respond(400, {})
      scope.step1 = false
      var el
      el = create(validHTML)
      // _$httpBackend.flush()
      // expect(_$state.go).toHaveBeenCalledWith('app.home')
      // expect(el.isolateScope().vm.registrationMetaData.step1).toEqual(false)

    })

    it('should send email', () =>{
      var el
      el = create(validHTML)
      el.isolateScope().vm.sendEmail()
      _$httpBackend.flush()
      expect(el.isolateScope().vm.registrationMetaData.emailSended).toEqual(true)
    })

    it('should NOT send email', () =>{
      registrationPOST.respond(400, {})

      var el
      el = create(validHTML)
      el.isolateScope().vm.sendEmail()
      _$httpBackend.flush()
      expect(el.isolateScope().vm.registrationMetaData.emailSended).toEqual(false)
    })


  })
})
