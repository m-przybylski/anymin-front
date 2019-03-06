import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable()
export class PinCodeTimerService {
  private readonly countDownMax = 30;
  private readonly oneSecondInterval: number = 1000;

  public getTimeLeft$(): Observable<number> {
    const startDate = Date.now();

    return timer(0, this.oneSecondInterval)
      .pipe(take(this.countDownMax + 1))
      .pipe(map(() => this.countDownMax + Math.round((startDate - Date.now()) / this.oneSecondInterval)));
  }
}
