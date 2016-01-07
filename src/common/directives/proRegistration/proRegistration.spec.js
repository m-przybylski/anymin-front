describe('Unit testing: profitelo.directive.proRegistration', () => {
  return describe('for proRegistration directive >', () => {

    var compile       = null
    var scope         = null
    var _$httpBackend = null
    var _$state       = null

    var validHTML = '<div data-pro-registration data-step1="step1"></div>'

    var registrationPOST = null
    var registrationGET  = null

    beforeEach(() => {
      module('templates-module')
      module('profitelo.directive.proRegistration')

      inject(($rootScope, $compile, _$httpBackend_, _$state_) => {
        scope         = $rootScope.$new()
        compile       = $compile
        scope.step1   = true
        _$state       = _$state_
        _$httpBackend = _$httpBackend_


      })
      _$state.current.name = 'app.registration'

      registrationGET  = _$httpBackend.when('GET', 'http://api.profitelo.pl/registration')
      .respond(200, {})

      registrationPOST =_$httpBackend.when('POST', 'http://api.profitelo.pl/registration')
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
      _$httpBackend.flush()
      expect(_$state.go).toHaveBeenCalledWith('app.home')
      expect(el.isolateScope().vm.registrationMetaData.step1).toEqual(false)

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
