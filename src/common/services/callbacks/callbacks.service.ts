import * as angular from 'angular'

export class CallbacksService {

  public methods: {[key: string]: any} = {}

  private handlers: {[key: string]: any} = {}

  constructor(private $timeout: ng.ITimeoutService, events: string[]) {

    angular.forEach(events, event => {
      this.handlers[event] = []
      this.methods[event] = (handler: any): void => {
        if (angular.isFunction(handler)) {
          this.handlers[event].push((...args: any[]) => this.$timeout(() => handler.apply(null, args)))
        }
      }
    })
  }

  public notify = (event: string, ...args: any[]): void => {
    if (this.handlers.hasOwnProperty(event)) {
      angular.forEach(this.handlers[event], handler => {
        if (angular.isFunction(handler)) {
          handler.apply(null, args)
        }
      })
    }
  }
}
