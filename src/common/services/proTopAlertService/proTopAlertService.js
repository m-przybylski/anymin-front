(function() {
  function proTopAlertService($filter, $timeout) {

    let _alertArray = []
    let defaultOptions = {}
    let _pushAlert = (alert) => {
      _alertArray.push(alert)
    }

    let _setId = ()=> {
      let d = new Date()
      let n = d.getMilliseconds() + Math.floor(Math.random() * 1000)
      return n
    }

    let _destroyAlert = (alertId)=> {
      _.remove(_alertArray, (alert)=> {
        return alert.id === alertId
      })
    }

    let _timeoutDestroy = (timeout, id) => {
      let realTimeout = timeout * 1000
      if (typeof timeout !== 'undefined' && timeout !== null) {
        $timeout(() => {
          _destroyAlert(id)
        }, realTimeout)
      }
    }

    let _init = (mainOptions, options) => {
      _pushAlert(mainOptions)
      angular.extend(mainOptions, options)
      _timeoutDestroy(mainOptions.timeout, mainOptions.id)
    }

    return {
      bindAlert: (alerts) => {
        alerts(_alertArray)
      },
      success: (options) => {
        let id = _setId()
        defaultOptions = {
          id:       id,
          icon:    'icon-success-24',
          message:  '',
          header:   'Success',
          type:     'success',
          timeout:  null
        }
        _init(defaultOptions, options)
      },
      warning: (options) => {
        let id = _setId()
        defaultOptions = {
          id:       id,
          icon:    'icon-warning-24',
          message:  '',
          header:   'Warning',
          type:     'warning',
          timeout:  null
        }
        _init(defaultOptions, options)
      },
      error: (options) => {
        let id = _setId()
        defaultOptions = {
          id:       id,
          icon:    'icon-danger-24',
          message:  '',
          header:   'Error',
          type:     'error',
          timeout:  null
        }
        _init(defaultOptions, options)
      },
      info: (options) => {
        let id = _setId()
        defaultOptions = {
          id:       id,
          icon:    'icon-info-24',
          message:  '',
          header:   'Info',
          type:     'info',
          timeout:  null
        }
        _init(defaultOptions, options)
      },
      destroyAlert: (alertId) => {
        _destroyAlert(alertId)
      }

    }
  }
  angular.module('profitelo.directives.pro-top-alert-service', [])
    .service('proTopAlertService', proTopAlertService)
}())