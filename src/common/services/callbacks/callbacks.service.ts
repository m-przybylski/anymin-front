import * as angular from "angular"

export class CallbacksService {

  public methods: {[key: string]: any} = {}

  private handlers: {[key: string]: any} = {}

  constructor(private $timeout: ng.ITimeoutService, events: Array<string>) {

    angular.forEach(events, event => {
      this.handlers[event] = []
      this.methods[event] = (handler: any) => {
        if (angular.isFunction(handler)) {
          this.handlers[event].push((...args: Array<any>) => this.$timeout(() => handler.apply(null, args)))
        }
      }
    })
  }

  public notify = (event: string, ...args: Array<any>) => {
    if (this.handlers.hasOwnProperty(event)) {
      angular.forEach(this.handlers[event], handler => {
        if (angular.isFunction(handler)) {
          handler.apply(null, args)
        }
      })
    }
  }
}
