angular.module('user', [
  'authorization'
])

.factory('UserService', ($q, SessionsApi) => {


  let _userData = {
    telcoLogin:         '',
    email:              '',
    apiKey:             '',
    registeredAt:       '',
    id:                 '',
    isDeleted:          false,
    telcoPin:           '',
    isBlocked:          false,
    password:           '',
    status: {
      wizardComplete:   false
    }
  }
  let _isLoggedIn = false

  let _fetchData = () => {
    SessionsApi.get().$promise.then((response) => {
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