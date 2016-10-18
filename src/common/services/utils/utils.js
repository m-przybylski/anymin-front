(function() {
  function service($timeout) {

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
          if (handlers.hasOwnProperty(event) > -1) {
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

    return {
      callbacksFactory: callbacksFactory
    }
  }

  angular.module('profitelo.services.utils', [
  ])
    .factory('UtilsService', service)

}())