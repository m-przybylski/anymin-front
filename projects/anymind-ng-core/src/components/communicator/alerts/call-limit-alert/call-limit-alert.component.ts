import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'am-core-call-limit-alert',
  templateUrl: 'call-limit-alert.component.html',
  styleUrls: ['../call-alerts.sass'],
})
export class CallLimitAlertComponent implements OnInit, OnDestroy {
  public timeLeft: number;

  private readonly countingStart = 60;
  private readonly oneSecond = 1000;
  private timeoutNumber: number;

  public ngOnInit(): void {
    this.timeLeft = this.countingStart;
    this.startCountDown();
  }

  public ngOnDestroy(): void {
    clearTimeout(this.timeoutNumber);
  }

  private startCountDown(): NodeJS.Timer {
    return setTimeout(() => {
      if (!(this.timeLeft < 0)) {
        this.timeLeft--;
      }
    }, this.oneSecond);
  }
}
