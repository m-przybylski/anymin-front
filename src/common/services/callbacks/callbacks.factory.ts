import {CallbacksService} from "./callbacks.service"

export class CallbacksFactory {

  /* @ngInject */
  constructor(private $timeout: ng.ITimeoutService) {
  }

  public getInstance = (events: Array<string>) => {
    return new CallbacksService(this.$timeout, events)
  }
}
