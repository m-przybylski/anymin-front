// tslint:disable:no-empty
// tslint:disable:newline-before-return
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';
import { CommonConfig } from '../../../../common-config';

@Injectable()
export class PinCodeTimerService {

  private readonly countDownMax = CommonConfig.getCommonConfig().config['request-msisdn-token-timeout'];
  private readonly oneSecondInterval: number = 1000;

  constructor() {
  }

  public getTimeLeft$ = (): Observable<number> => {
    const startDate = Date.now();
    return timer(0, this.oneSecondInterval)
      .pipe(take(this.countDownMax + 1))
      .pipe(map(() =>
        this.countDownMax + Math.round((startDate - Date.now()) / this.oneSecondInterval)));
  }

}
