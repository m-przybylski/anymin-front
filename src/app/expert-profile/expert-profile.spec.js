describe('Unit tests: expert-profile >', () => {
  describe('Testing Controller: ExpertProfileController', () => {

    var $scope = null
    var ExpertProfileController = null
    var AccountsRestServiceResolver = null

    beforeEach(() => {
      AccountsRestServiceResolver = {
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
    })

    beforeEach(() => {
      module('profitelo.controller.expert-profile')
      inject(($rootScope, $controller, $state) => {
        $scope = $rootScope.$new()
        ExpertProfileController = $controller('ExpertProfileController', {
          $scope: $scope,
          $rootScope: $rootScope,
          $state: $state,
          Account: AccountsRestServiceResolver
        })
      })
    })

    it('should exsist', () => {
      return expect(!!ExpertProfileController).toBe(true)
    })

    describe('controller resolve services', () => {
      it('AccountsRestServiceResolver should exsist', () => {
        return expect(!!AccountsRestServiceResolver).toBe(true)
      })
    })

  })
})
