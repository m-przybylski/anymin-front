angular.module('hellojs', [

])

.factory('HellojsService', HellojsService)

function HellojsService($q) {

  hello.init(
    {
      'facebook': '661427837225126',
      'google': '996661759407-pf3q2igbo7e1oq5o9v6p1pjjnrvd7qe3.apps.googleusercontent.com',
      'linkedin': '75q0l9bhc33fyn'
    },
    {
      'redirect_uri': '/',
      'scope': 'email'
    }
  )


  let _authResponseIsValid

  _authResponseIsValid = (authResponse) => {
    return authResponse && authResponse.access_token && authResponse.expires > new Date().getTime() / 1000
  }


  let _logout

  _logout = (socialNetworkName, silently) => {
    if (silently === 'undefined' || typeof silently === null) {
      silently = false
    }
    return hello(socialNetworkName).logout().then(() => {
      var _msg
      if (silently) {
        _msg = {
          msg: 'SINGED_OUT_FROM_@',
          type: 'success',
          vars: {
            socialNetwork: socialNetworkName
          }
        }
        return GlobalNotificationsService.add(_msg)
      } else {
        return console.log('Singed out from ' + socialNetworkName)
      }
    }, (e) => {
      var _msg
      if (silently) {
        _msg = {
          msg: 'SIGNED_OUT_ERROR_@',
          type: 'error',
          vars: {
            errorMessage: e.error.message
          }
        }
        return GlobalNotificationsService.add(_msg)
      } else {
        return console.log('Signed out error:' + e.error.message)
      }
    })
  }


  let _login
  _login = function(socialNetworkName) {
    var authResponse, deferred
    authResponse = hello.getAuthResponse(socialNetworkName)
    if (_authResponseIsValid(authResponse)) {
      deferred = $q.defer()
      deferred.resolve(authResponse)
      return deferred.promise
    } else {
      return hello(socialNetworkName).login().then(function(auth) {
        if (_authResponseIsValid(auth.authResponse)) {
          return auth
        } else {
          console.log('authResponseIsValid error. auth object:', auth)
          return false
        }
      }, function(e) {
        console.log('hello(socialNetworkName).login() error:', e)
        return false
      })
    }
  }

  let api = {
    authResponseIsValid: _authResponseIsValid,
    logout: _logout,
    login: _login,
    getMe: function(socialNetworkName) {
      var authResponse
      authResponse = hello.getAuthResponse(socialNetworkName)
      if (_authResponseIsValid(authResponse)) {
        console.log('resend auth response', authResponse)
        return _me(socialNetworkName, false)
      } else {
        return hello(socialNetworkName).login().then(function(auth) {
          if (_authResponseIsValid(auth.authResponse)) {
            return _me(socialNetworkName, false)
          } else {
            console.log('Error in: hello(socialNetworkName).login()')
            return false
          }
        }, function(e) {
          console.log('Error', e)
        })
      }
    }
  }

  return api

}