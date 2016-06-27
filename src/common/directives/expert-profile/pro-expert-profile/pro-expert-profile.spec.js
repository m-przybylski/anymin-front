// describe('Unit testing: profitelo.directives.pro-expert-profile>', function() {
//   return describe('for pro-expert-profile directive >', function() {
//
//     var compile = null
//     var scope = null
//
//     var _account = {}
//     var _profilesNew = []
//
//     beforeEach(function() {
//       _account =  {
//         'telcoLogin': '0000000',
//         'email': 'admin@itelo.pl',
//         'password': 'password',
//         'telcoPin': 1234,
//         'apiKey': 'string',
//         'createdAt': '1970-01-01T00:00:00',
//         'lastLoggedAt' : '2015-12-17T20:10:17.681',
//         'isBlocked': false,
//         'isDeleted': false,
//         'config': {
//           'agreeAudioRecord': false,
//           'agreeProcessData': false,
//           'agreeSendCommercialInformation': false,
//           'agreeVideoRecord': false,
//           'emailChargebacksAndReclamations': false,
//           'emailFinance': false,
//           'emailMarksAndComments': false,
//           'emailRating': false,
//           'emailUpcomingTerms': false,
//           'ivrChosenCategory': false,
//           'ivrCostEstimation': false,
//           'ivrPrice': false,
//           'ivrRecording': false
//         },
//         'status': {
//           'wizardComplete': false
//         }
//       }
//
//       _profilesNew = {
//         'id': 'UUID',
//         'organization': {
//           'ownerId': 'UUID'
//         },
//         'agentId': 'UUID',
//         'isActive': true,
//         'contract': {
//           'current': {
//             'serviceId': 'UUID',
//             'type': 'FREELANCER',
//             'group': '',
//             'margin': 0.6,
//             'calendar': {
//               'terms': [
//                 {
//                   'repeat': 'EVERYDAY',
//                   'isExclusive': false,
//                   'dayOfWeek': 1,
//                   'from': '00:00:00',
//                   'to': '00:00:00'
//                 }
//               ]
//             }
//           },
//           'toAccept': {
//             'serviceId': 'UUID',
//             'type': 'FREELANCER',
//             'group': '',
//             'margin': 0.6,
//             'calendar': {
//               'terms': [
//                 {
//                   'repeat': 'EVERYDAY',
//                   'isExclusive': false,
//                   'dayOfWeek': 1,
//                   'from': '00:00:00',
//                   'to': '00:00:00'
//                 }
//               ]
//             }
//           }
//         },
//         'msisdn': '48515515515',
//         'details': {
//           'current': {
//             'name': 'name',
//             'description': 'description',
//             'avatarFileId': 'UUID',
//             'coverFileId': 'UUID'
//           },
//           'toVerify': {
//             'name': 'name',
//             'description': 'description',
//             'avatarFileId': 'UUID',
//             'coverFileId': 'UUID'
//           },
//           'verificationStatus': {
//             'status': 'REJECTED',
//             'comments': [
//               'ubogi opis'
//             ]
//           }
//         }
//       }
//     })
//
//     var validHTML = '<div data-pro-expert-profile="" data-profiles-new="profilesNew"></div>'
//
//     beforeEach(function() {
//       module('templates-module')
//       module('profitelo.directives.pro-expert-profile')
//
//       inject(function($rootScope, $compile) {
//         scope = $rootScope.$new()
//         compile = $compile
//         scope.profilesNew  = _profilesNew
//       })
//     })
//
//     function create() {
//       var elem = angular.element(validHTML)
//       var compiledElement = compile(elem)(scope)
//       scope.$digest()
//       return compiledElement
//     }
//
//     it('should have a dummy test', inject(function() {
//       expect(true).toBeTruthy()
//     }))
//
//     it('compile the directive', function() {
//       var el
//       el = create()
//       expect(el.html()).toBeDefined(true)
//     })
//
//     // it('should have a scope on root element', function() {
//     //   var el
//     //   el = create()
//     //   expect(el.isolateScope()).toBeDefined()
//     //   expect(el.isolateScope().$id).not.toEqual(scope.$id)
//     // })
//
//     // it('should have account resource on scope', function() {
//     //   var el
//     //   el = create()
//     //   expect(el.isolateScope().account).toEqual(_account)
//     // })
//
//     // it('should have userProfiles resource on scope', function() {
//     //   var el
//     //   el = create()
//     //   expect(el.isolateScope().userProfile).toEqual(_userProfile)
//     // })
//
//
//   })
// })
