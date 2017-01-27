namespace profitelo.services.callbacks {

  export interface ICallbacksService {
    notify(event: string, ...args): void
    methods: any
  }

  export interface ICallbacksFactory {
    getInstance(events: Array<string>): ICallbacksService
  }

  class CallbacksService implements ICallbacksService {

    public methods = {}

    private handlers = {}

    constructor(private $timeout: ng.ITimeoutService, events: Array<string>) {

      angular.forEach(events, event => {
        this.handlers[event] = []
        this.methods[event] = handler => {
          if (angular.isFunction(handler)) {
            this.handlers[event].push((...args) => this.$timeout(() => handler.apply(null, args)))
          }
        }
      })
    }

    public notify = (event, ...args) => {
      if (this.handlers.hasOwnProperty(event)) {
        angular.forEach(this.handlers[event], handler => {
          if (angular.isFunction(handler)) {
            handler.apply(null, args)
          }
        })
      }
    }
  }

  class CallbacksFactory implements ICallbacksFactory {

    constructor(private $timeout: ng.ITimeoutService) {
    }

    public getInstance = (events: Array<string>) => {
      return new CallbacksService(this.$timeout, events)
    }
  }

  angular.module('profitelo.services.callbacks', [])
    .service('callbacksFactory', CallbacksFactory)
}