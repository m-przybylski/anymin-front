describe('Unit testing: profitelo.directive.expert-profile>', function() {
  return describe('for expertProfile directive >', function() {

    var compile = null
    var scope = null

    var account =  {
      'telcoLogin': '0000000',
      'email': 'admin@itelo.pl',
      'telcoPin': 1234,
      'createdAt': '1970-01-01T00:00:00',
      'lastLoggedAt' : '2015-12-17T20:10:17.681',
      'isBlocked': 0,
      'isDeleted': 0,

      'organizations': {
        'profiles': [
          {
            'url': 'http://api.profitelo.pl/accounts/4941258/',
            'servicesUrl': 'http://api.profitelo.pl/accounts/4941258/services/',
            'messagesUrl': 'http://api.profitelo.pl/accounts/4941258/messages/',
            'phonesUrl': 'http://api.profitelo.pl/accounts/4941258/phones/',
            'currency': 'PLN',
            'language': 'en_EN',
            'generalInfo': 'bla bla bla, it\'s should a very long text but it\'s not'
          }
        ]
      }
    }

    var validHTML = '<div data-expert-profile="" data-account="account"></div>'

    beforeEach(function() {
      module('templates-module')
      module('profitelo.directive.expert-profile')

      inject(function($rootScope, $compile) {
        scope = $rootScope.$new()
        compile = $compile
        scope.account = account
      })
    })

    function create() {
      var elem = angular.element(validHTML)
      var compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(function() {
      expect(true).toBeTruthy()
    }))

    it('compile the directive', function() {
      var el
      el = create()
      expect(el.html()).toBeDefined(true)
    })

    it('should have a scope on root element', function() {
      var el
      el = create()
      expect(el.isolateScope()).toBeDefined()
      expect(el.isolateScope().$id).not.toEqual(scope.$id)
    })

    it('should have account resource on scope', function() {
      var el
      el = create()
      expect(el.isolateScope().account).toEqual(account)
    })


  })
})
