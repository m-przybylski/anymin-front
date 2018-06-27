import { Call } from 'ratel-sdk-js';
import { ExpertCall } from './current-expert-call';
import { Subscription } from 'rxjs';
import { merge } from 'rxjs/observable/merge';

export class PullableCall {

  constructor(private pullCallback: () => ng.IPromise<ExpertCall>, private call: Call) {
  }

  public onPullExpired = (cb: () =>  void): Subscription =>
    merge(this.call.end$, this.call.left$).subscribe(cb)

  public pull = (): ng.IPromise<ExpertCall> =>
    this.pullCallback()
}
