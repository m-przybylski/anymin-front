import { Call } from 'ratel-sdk-js';
import { ExpertCall } from './current-expert-call';

export class PullableCall {

  constructor(private pullCallback: () => ng.IPromise<ExpertCall>, private call: Call) {
  }

  public onPullExpired = (cb: () =>  void): void => {
    this.call.onEnd(cb);
    this.call.onLeft(cb);
  }

  public pull = (): ng.IPromise<ExpertCall> =>
    this.pullCallback()
}
