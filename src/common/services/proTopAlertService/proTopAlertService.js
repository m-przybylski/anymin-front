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
      if (typeof timeout !== 'undefined' && timeout !== null) {
        let realTimeout = timeout * 1000
        $timeout(() => {
          _destroyAlert(id)
        }, realTimeout)
      }
    }

    let _init = (options) => {
      _pushAlert(options)
      _timeoutDestroy(options.timeout, options.id)
    }
    return {
      bindAlert: (alerts) => {
        alerts(_alertArray)
      },
      success: (options) => {
        let header = options.header === undefined ? $filter('translate')('INTERFACE.ALERT_SUCCESS') : options.header
        let id = _setId()
        defaultOptions = {
          id:       id,
          icon:    'icon-success-24',
          message:  '',
          header:   header,
          type:     'success',
          timeout:  null
        }
        _init(angular.extend(defaultOptions, options))
      },
      warning: (options) => {
        let header = options.header === undefined ? $filter('translate')('INTERFACE.ALERT_WARNING') : options.header
        let id = _setId()
        defaultOptions = {
          id:       id,
          icon:    'icon-warning-24',
          message:  '',
          header:   header,
          type:     'warning',
          timeout:  null
        }
        _init(angular.extend(defaultOptions, options))
      },
      error: (options) => {
        let header = options.header === undefined ? $filter('translate')('INTERFACE.ALERT_ERROR') : options.header
        let id = _setId()
        defaultOptions = {
          id:       id,
          icon:    'icon-danger-24',
          message:  '',
          header:   header,
          type:     'error',
          timeout:  null
        }
        _init(angular.extend(defaultOptions, options))
      },
      info: (options) => {
        let header = options.header === undefined ? $filter('translate')('INTERFACE.ALERT_INFO') : options.header
        let id = _setId()
        defaultOptions = {
          id:       id,
          icon:    'icon-info-24',
          message:  '',
          header:   header,
          type:     'info',
          timeout:  null
        }
        _init(angular.extend(defaultOptions, options))
      },
      destroyAlert: (alertId) => {
        _destroyAlert(alertId)
      }

    }
  }
  angular.module('profitelo.directives.pro-top-alert-service', [])
    .service('proTopAlertService', proTopAlertService)
}())