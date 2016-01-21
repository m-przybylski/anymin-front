angular.module('user', [
  'authorization'
])

.factory('UserService', ($q) => {


  let _userData = {
    telcoLogin:         '',
    email:              '',
    apiKey:             '',
    registeredAt:       '',
    id:                 '',
    isDeleted:          false,
    telcoPin:           '0000',
    isBlocked:          false,
    password:           '',
    status: {
      wizardComplete:   false
    }
  }
  let _isLoggedIn = false


  let _setData = (parameters) => {
    angular.extend(_userData, parameters)

  }
  let _getAllData = () => {
    return _userData
  }

  return{
    getAllData: _getAllData,
    setData:    _setData
  }


})