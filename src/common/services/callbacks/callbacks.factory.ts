import {CallbacksService} from './callbacks.service'

export class CallbacksFactory {

  /* @ngInject */
  constructor(private $timeout: ng.ITimeoutService) {
  }

  public getInstance = (events: string[]): CallbacksService => new CallbacksService(this.$timeout, events)
}
