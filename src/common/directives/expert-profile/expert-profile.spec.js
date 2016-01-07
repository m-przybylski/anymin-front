describe('Unit testing: profitelo.directive.expert-profile>', function() {
  return describe('for expertProfile directive >', function() {

    var compile = null
    var scope = null

    var _account = {}
    var _userProfile = []

    beforeEach(function() {
      _account =  {
        'telcoLogin': '0000000',
        'email': 'admin@itelo.pl',
        'password': 'password',
        'telcoPin': 1234,
        'apiKey': 'string',
        'createdAt': '1970-01-01T00:00:00',
        'lastLoggedAt' : '2015-12-17T20:10:17.681',
        'isBlocked': false,
        'isDeleted': false,
        'config': {
          'agreeAudioRecord': false,
          'agreeProcessData': false,
          'agreeSendCommercialInformation': false,
          'agreeVideoRecord': false,
          'emailChargebacksAndReclamations': false,
          'emailFinance': false,
          'emailMarksAndComments': false,
          'emailRating': false,
          'emailUpcomingTerms': false,
          'ivrChosenCategory': false,
          'ivrCostEstimation': false,
          'ivrPrice': false,
          'ivrRecording': false
        },
        'status': {
          'wizardComplete': false
        }
      }

      _userProfile = [
        {
          'url': '/organizations/{organizationId}/profiles/{profileId}',
          'organization': {
            'ownerId': 'UUID'
          },
          'isActive': true,
          'contract': {
            'current': {
              'serviceId': 'UUID',
              'type': 'FREELANCER',
              'group': '',
              'margin': '.6',
              'calendar': {
                'terms': [
                  {
                    'repeat': 'EVERYDAY|EVERYWORKDAY|EVERYWEEKEND|WEEKLY',
                    'isExclusive': false,
                    'dayOfWeek': 'dayOfweek',
                    'from': 'time',
                    'to': 'time'
                  }
                ]
              }
            },
            'toAccept': {}
          },
          'msisdn': '48515515515',
          'details': {
            'current': {
              'name': 'name',
              'description': 'description',
              'avatarFileId': 'UUID',
              'coverFileId': 'UUID'
            },
            'toVerify': {}
          }
        }
      ]
    })

    var validHTML = '<div data-expert-profile="" data-account="account" data-user-profile="userProfile"></div>'

    beforeEach(function() {
      module('templates-module')
      module('profitelo.directive.expert-profile')

      inject(function($rootScope, $compile) {
        scope = $rootScope.$new()
        compile = $compile
        scope.account       = _account
        scope.userProfile   = _userProfile
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
      expect(el.isolateScope().account).toEqual(_account)
    })

    it('should have userProfiles resource on scope', function() {
      var el
      el = create()
      expect(el.isolateScope().userProfile).toEqual(_userProfile)
    })


  })
})
