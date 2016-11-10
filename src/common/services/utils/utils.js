(function() {
  function service($timeout, $interval) {

    const callbacksFactory = events => {
      const
        handlers = {},
        methods = {}

      angular.forEach(events, event => {
        handlers[event] = []
        methods[event] = handler => {
          if (angular.isFunction(handler)) {
            handlers[event].push((...args) => $timeout(() => handler.apply(null, args)))
          }
        }
      })

      return {
        notify: (event, ...args) => {
          if (handlers.hasOwnProperty(event)) {
            angular.forEach(handlers[event], handler => {
              if (angular.isFunction(handler)) {
                handler.apply(null, args)
              }
            })
          }
        },
        methods: methods
      }
    }

    const timerFactory = (() => {

      const getInstance = (_cost, _freeMinutesCount) => {
        let _timer
        const _freeMinutes = _freeMinutesCount || 0
        return {
          start: (cb) => {
            const _start = Date.now()
            _timer = $interval(() => {
              const _time = (Date.now() - _start) / 1000
              cb({
                time: _time,
                cost: _cost * Math.max(0, _time - (60 * _freeMinutes)) / 60
              })
            }, 200)
          },
          stop: () => {
            $interval.cancel(_timer)
          }
        }
      }

      return {
        getInstance: getInstance
      }
    })()

    return {
      callbacksFactory: callbacksFactory,
      timerFactory: timerFactory
    }
  }

  angular.module('profitelo.services.utils', [
  ])
    .factory('UtilsService', service)

}())