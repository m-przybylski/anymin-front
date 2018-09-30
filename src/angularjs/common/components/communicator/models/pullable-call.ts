import { Call, callEvents } from 'ratel-sdk-js';
import { Observable } from 'rxjs';
import Ended = callEvents.Ended;

export class PullableCall {
  constructor(private call: Call) {}

  public onPullExpired = (): Observable<Ended> => this.call.end$;
}
