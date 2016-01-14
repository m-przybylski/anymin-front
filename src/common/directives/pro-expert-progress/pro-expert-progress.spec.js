describe('Unit testing: profitelo.directives.pro-expert-progress', () => {
  return describe('for pro-expert-progress directive >', () => {

    var compile       = null
    var scope         = null

    var validHTML = '<div data-pro-expert-progress data-container="accountSession"></div>'


    var _accountSession = {
      profileProgressPercentage: 25,
      serviceProgressPercentage: 36,
      verification: {
        status: 'IN_PROGRESS',
        details: [
          'Nieodpowiednie zdjęcie profilowe',
          'Ubogi opis'
        ]
      }
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.pro-expert-progress')

      inject(($rootScope, $compile) => {
        scope                 = $rootScope.$new()
        compile               = $compile
        scope.accountSession  = _accountSession
      })

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

    it('should compile the directive', () => {
      var el
      el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should be able to send for verification', () => {
      _accountSession.verification.status = 'REJECTED'
      _accountSession.profileProgressPercentage = 100
      _accountSession.serviceProgressPercentage = 100
      var el
      el = create(validHTML)
      expect(el.isolateScope().vm.verifyBox.ableToSend).toEqual(true)
    })

    it('should set profile and service progress percentage to 0 if other type than number is passed', () =>{
      _accountSession.verification.status = 'ACCEPTED'
      _accountSession.profileProgressPercentage = null
      _accountSession.serviceProgressPercentage = 'asd'
      var el
      el = create(validHTML)
      expect(el.isolateScope().container.profileProgressPercentage).toEqual(0)
      expect(el.isolateScope().container.serviceProgressPercentage).toEqual(0)

    })


    it('should display default text if something went wrong', () =>{
      _accountSession.verification.status = null
      var el
      el = create(validHTML)
      expect(el.isolateScope().vm.verifyBox.displayDefault).toEqual(true)

    })



  })
})
