(function() {
  function proTopAlertService($filter, $timeout) {

    let _alertArray = []
    let defaultOptions = {}
    let alertsLimit = 2
    let _setId = ()=> {
      let d = new Date()
      let n = d.getMilliseconds() + Math.floor(Math.random() * 1000)
      return n
    }

    let _destroyAlert = (alertId)=> {
      if (alertsLimit < _alertArray.length) {
        _alertArray[alertsLimit].visible = true
        _timeoutDestroy(_alertArray[alertsLimit].timeout, _alertArray[alertsLimit].id)
      }
      _.remove(_alertArray, (alert)=> {
        return alert.id === alertId
      })
    }

    let _timeoutDestroy = (timeout, id) => {
      if (typeof timeout !== 'undefined' && timeout !== null) {
        let realTimeout = timeout * 1000
        $timeout(() => {
          _destroyAlert(id)
        }, realTimeout)
      }
    }

    let _pushAlert = (options) => {
      if (_alertArray.length < alertsLimit) {
        options.visible = true
        _timeoutDestroy(options.timeout, options.id)
      }
      _alertArray.push(options)
    }

    return {
      bindAlert: (alerts) => {
        alerts(_alertArray)
      },
      success: (options) => {
        options = options === undefined ? {} : options
        defaultOptions = {
          id:       _setId(),
          icon:    'icon-success-24',
          message:  '',
          type:     'success',
          timeout:  null,
          visible:     false
        }
        _pushAlert(angular.extend(defaultOptions, options))
      },
      warning: (options) => {
        options = options === undefined ? {} : options
        defaultOptions = {
          id:       _setId(),
          icon:    'icon-warning-24',
          message:  '',
          type:     'warning',
          timeout:  null,
          visible:     false
        }
        _pushAlert(angular.extend(defaultOptions, options))
      },
      error: (options) => {
        options = options === undefined ? {} : options
        defaultOptions = {
          id:       _setId(),
          icon:    'icon-danger-24',
          message:  '',
          type:     'error',
          timeout:  null,
          visible:     false
        }
        _pushAlert(angular.extend(defaultOptions, options))
      },
      info: (options) => {
        options = options === undefined ? {} : options
        defaultOptions = {
          id:       _setId(),
          icon:    'icon-info-24',
          message:  '',
          type:     'info',
          timeout:  null,
          visible:     false
        }
        _pushAlert(angular.extend(defaultOptions, options))
      },
      destroyAlert: (alertId) => {
        _destroyAlert(alertId)
      }

    }
  }
  angular.module('profitelo.directives.pro-top-alert-service', [
    'pascalprecht.translate'
  ])
    .service('proTopAlertService', proTopAlertService)
}())