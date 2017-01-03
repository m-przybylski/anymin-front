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

      const getInstance = (_money, _freeMinutesCount, _interval) => {
        let _timer
        const interval = _interval || 200
        const _freeMinutes = _freeMinutesCount || 0
        return {
          start: (cb) => {
            const _start = Date.now()
            _timer = $interval(() => {
              const _time = (Date.now() - _start) / 1000
              cb({
                time: _time,
                money: {
                  amount: (_money.amount * Math.max(0, _time - (60 * _freeMinutes)) / 60),
                  currency: _money.currency
                }
              })
            }, interval)
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
      callTimerFactory: timerFactory
    }
  }

  angular.module('profitelo.services.utils', [
  ])
    .factory('UtilsService', service)

}())