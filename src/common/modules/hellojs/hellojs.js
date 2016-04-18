angular.module('hellojs', [

])

.factory('HellojsService', HellojsService)


function HellojsService($q) {

  hello.init(
    {
      'facebook': '559859100836336',
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


  let _logout = (socialNetworkName, silently) => {
    if (silently === 'undefined' || typeof silently === null) {
      silently = false
    }
    hello(socialNetworkName).logout().then(() => {
      var _msg
      if (silently) {
        _msg = {
          msg: 'SINGED_OUT_FROM_@',
          type: 'success',
          vars: {
            socialNetwork: socialNetworkName
          }
        }
        // GlobalNotificationsService.add(_msg)
      } else {
        console.log('Singed out from ' + socialNetworkName)
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
        // GlobalNotificationsService.add(_msg)
      } else {
        return console.log('Signed out error:' + e.error.message)
      }
    })
  }

  let _login = function(socialNetworkName) {
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


  var _me

  _me = function(socialNetworkName) {
    hello(socialNetworkName).api('me').then(function(data) {

      console.log(data)

    }, function(error) {

      console.log(error)

    })
  }


  return {
    authResponseIsValid: _authResponseIsValid,
    logout: _logout,
    login: _login,
    getMe: function(socialNetworkName) {
      var authResponse
      authResponse = hello.getAuthResponse(socialNetworkName)
      if (_authResponseIsValid(authResponse)) {
        console.log('resend auth response', authResponse)
        _me(socialNetworkName, false)
      } else {
        hello(socialNetworkName).login().then(function(auth) {
          if (_authResponseIsValid(auth.authResponse)) {
            _me(socialNetworkName, false)
          } else {
            console.log('Error in: hello(socialNetworkName).login()')
          }
        }, function(e) {
          console.log('Error', e)
        })
      }
    }
  }
}