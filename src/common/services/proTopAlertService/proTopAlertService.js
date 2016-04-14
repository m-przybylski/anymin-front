(function() {
  function proTopAlertService($filter) {

    let _alertArray = []
    let _alertObject = {}

    let _pushAlert = (alert) => {
      _alertObject = alert
      _alertArray.push(alert)
    }

    let _setId = ()=> {
      let d = new Date()
      let n = d.getMilliseconds() + Math.floor(Math.random() * 1000)
      return n
    }

    return {
      bindAlert: (alerts) => {
        alerts(_alertArray)
      },
      success: (message, header, icon = 'icon-success-24') => {

        // header = header === undefined ? $filter('translate')('KLUCZ.TRANSLACJI') : header;

        
        _pushAlert({
          id:       _setId(),
          type:     'success',
          header:   header,
          message:  message,
          icon:     icon
        })
      },
      warning: (message, header, icon = 'icon-warning-24') => {
        _pushAlert({
          id:       _setId(),
          type:     'warning',
          header:   header,
          message:  message,
          icon:     icon
        })
      },
      error: (message, header, icon = 'icon-danger-24') => {
        _pushAlert({
          id:       _setId(),
          type:     'error',
          header:   header,
          message:  message,
          icon:     icon
        })
      },
      info: (message, header, icon = 'icon-info-24') => {
        _pushAlert({
          id:       _setId(),
          type:     'info',
          header:   header,
          message:  message,
          icon:     icon
        })
      }

    }
  }
  angular.module('profitelo.directives.pro-top-alert-service', [])
    .service('proTopAlertService', proTopAlertService)
}())