(function() {
  function proTopAlertService($filter, $timeout) {

    let _alertArray = []

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
      if (typeof timeout !== 'undefined') {
        $timeout(() => {
          _destroyAlert(id)
        }, realTimeout)
      }
    }

    return {
      bindAlert: (alerts) => {
        alerts(_alertArray)
      },
      success: (message, header, timeout, icon = 'icon-success-24') => {

        // header = header === undefined ? $filter('translate')('KLUCZ.TRANSLACJI') : header;
        let id = _setId()
        _pushAlert({
          id:       id,
          type:     'success',
          header:   header,
          message:  message,
          icon:     icon
        })
        _timeoutDestroy(timeout, id)

      },
      warning: (message, header, timeout, icon = 'icon-warning-24') => {

        let id = _setId()
        _pushAlert({
          id:       id,
          type:     'warning',
          header:   header,
          message:  message,
          icon:     icon
        })
        _timeoutDestroy(timeout, id)
      },
      error: (message, header, timeout, icon = 'icon-danger-24') => {

        let id = _setId()
        _pushAlert({
          id:       id,
          type:     'error',
          header:   header,
          message:  message,
          icon:     icon
        })
        _timeoutDestroy(timeout, id)
      },
      info: (message, header, timeout, icon = 'icon-info-24') => {

        let id = _setId()
        _pushAlert({
          id:       id,
          type:     'info',
          header:   header,
          message:  message,
          icon:     icon
        })
        _timeoutDestroy(timeout, id)
      },
      destroyAlert: (alertId) => {
        _destroyAlert(alertId)
      }

    }
  }
  angular.module('profitelo.directives.pro-top-alert-service', [])
    .service('proTopAlertService', proTopAlertService)
}())