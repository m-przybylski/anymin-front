(function() {
  function proTopAlertService() {

    let _alertArray = []
    let _alertObject = {}

    let _pushAlert = (alert) => {
      _alertObject = alert
      _alertArray.push(alert)
    }

    let _setId = ()=> {
      let d = new Date()
      let n = d.getMilliseconds()
      return n
    }

    let _successAlert = (message, header) => {
      _pushAlert({
        id: _setId(),
        type: 'success',
        header: header,
        message: message,
        icon: 'icon-success-24'
      })
    }

    let _warningAlert = (message, header) => {
      _pushAlert({
        id: _setId(),
        type: 'warning',
        header: header,
        message: message,
        icon: 'icon-warning-24'
      })
    }

    let _errorAlert = (message, header) => {
      _pushAlert({
        id: _setId(),
        type: 'error',
        header: header,
        message: message,
        icon: 'icon-danger-24'
      })
    }

    let _infoAlert = (message, header) => {
      _pushAlert({
        id: _setId(),
        type: 'info',
        header: header,
        message: message,
        icon: 'icon-info-24'
      })
    }

    return {
      bindAlert: (alerts) => {
        alerts(_alertArray)
      },
      success: (message) => {
        _successAlert(message, 'success')
      },
      warning: (message) => {
        _warningAlert(message, 'warning')
      },
      error: (message) => {
        _errorAlert(message, 'error')
      },
      info: (message) => {
        _infoAlert(message, 'info')
      }

    }
  }
  angular.module('profitelo.directives.pro-top-alert-service', [])
    .service('proTopAlertService', proTopAlertService)
}())