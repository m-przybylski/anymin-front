angular.module('profitelo.services.user', [
  'profitelo.modules.authorization'
])

.factory('UserService', ($q, SessionApi) => {

  let _userData = {
    'telcoLogin': '000000',
    'email': 'admin@profitelo.pl',
    'permissions': [],
    'config': {
      'agreeProcessData': false,
      'ivrCostEstimation': true,
      'agreeVideoRecord': false,
      'ivrRecording': true,
      'agreeSendCommercialInformation': false,
      'emailUpcomingTerms': true,
      'ivrPrice': true,
      'emailMarksAndComments': true,
      'emailChargebacksAndReclamations': true,
      'ivrChosenCategory': true,
      'emailRating': true,
      'agreeAudioRecord': false,
      'emailFinance': true
    },
    'apiKey': '',
    'registeredAt': '',
    'id': null,
    'isDeleted': false,
    'status': {
      'wizardComplete': false
    },
    'isBlocked': false,
    'lastLoggedAt': null
  }

  let _isLoggedIn = false

  let _fetchData = () => {
    SessionApi.get().$promise.then((response) => {
      angular.extend(_userData, response)
      _isLoggedIn = true
    }, (error) => {
      _isLoggedIn = false
    })
  }

  let _setData = (parameters) => {
    angular.extend(_userData, parameters)
  }

  let _getAllData = () => {
    return _userData
  }

  return{
    fetchData:  _fetchData,
    getAllData: _getAllData,
    setData:    _setData,
    isLoggedIn: () => { return _isLoggedIn }
  }

})
