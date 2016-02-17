describe('Unit tests: expert-profile >', () => {
  describe('Testing Controller: ExpertProfileController', () => {

    var $scope = null
    var ExpertProfileController = null
    var AccountsApiResolver = null
    var ProfilesApiResolver = null
    var ProfilesNewApiResolver = null

    beforeEach(() => {
      // single account data
      AccountsApiResolver = {
        'telcoLogin': '0000000',
        'email': 'admin@itelo.pl',
        'password': 'password',
        'telcoPin': 1234,
        'apiKey': 'string',
        'createdAt': '1970-01-01T00:00:00',
        'lastLoggedAt': '2015-12-17T20:10:17.681',
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

      ProfilesNewApiResolver = [
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

    beforeEach(() => {
      module('profitelo.controller.expert-profile')
      inject(($rootScope, $controller, $state) => {
        $scope = $rootScope.$new()
        ExpertProfileController = expertProfileController
      })
    })

    describe('controller resolve services', () => {
      it('ExpertProfileController should exsist', () => {
        return expect(!!ExpertProfileController).toBe(true)
      })

      it('ProfilesNewApiResolver should exsist', () => {
        return expect(!!ProfilesNewApiResolver).toBe(true)
      })
    })

  })
})
