import { Call } from 'ratel-sdk-js';
import { Subscription } from 'rxjs';
import { merge } from 'rxjs/observable/merge';
import { CurrentExpertCall } from '@anymind-ng/core';

export class PullableCall {

  constructor(private pullCallback: () => ng.IPromise<CurrentExpertCall>, private call: Call) {
  }

  public onPullExpired = (cb: () =>  void): Subscription =>
    merge(this.call.end$, this.call.left$).subscribe(cb)

  public pull = (): ng.IPromise<CurrentExpertCall> =>
    this.pullCallback()
}
