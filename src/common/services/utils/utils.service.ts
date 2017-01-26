namespace profitelo.services.utils {

  // TODO create separate factories for those two
  export interface IUtilsService {
    callbacksFactory(events: Array<string>): any
    callTimerFactory: any
  }

  class UtilsService implements IUtilsService {

    constructor(private $timeout: ng.ITimeoutService, private $interval: ng.IIntervalService) {

    }

    public callbacksFactory = (events: Array<string>) => {
      const
        handlers = {},
        methods = {}

      angular.forEach(events, event => {
        handlers[event] = []
        methods[event] = handler => {
          if (angular.isFunction(handler)) {
            handlers[event].push((...args) => this.$timeout(() => handler.apply(null, args)))
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

    public callTimerFactory = (() => {

      const getInstance = (_money, _freeMinutesCount, _interval) => {
        let _timer
        const interval = _interval || 200
        const _freeMinutes = _freeMinutesCount || 0
        return {
          start: (cb) => {
            const _start = Date.now()
            _timer = this.$interval(() => {
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
            this.$interval.cancel(_timer)
          }
        }
      }

      return {
        getInstance: getInstance
      }
    })()

  }

  angular.module('profitelo.services.utils', [])
  .service('utilsService', UtilsService)
}