import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MoneyDto } from '@anymind-ng/api';
import { CurrentClientCall } from '../../../../../services/call/current-client-call';
import { CurrentExpertCall } from '../../../../../services/call/current-expert-call';

@Component({
  selector: 'am-core-navigation-description',
  templateUrl: 'navigation-description.component.html',
  styleUrls: ['navigation-description.component.sass'],
})
export class NavigationDescriptionComponent implements OnInit, OnDestroy {
  public callLengthInSeconds = 0;

  public callCost?: MoneyDto;

  @Input()
  public newCallEvent: Subject<CurrentClientCall | CurrentExpertCall>;

  @Input()
  public hangupCall: () => void;

  private ngUnsubscribe$ = new Subject<void>();

  public ngOnInit(): void {
    this.newCallEvent.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(call => this.onNewCall(call));
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private onNewCall(call: CurrentClientCall | CurrentExpertCall): void {
    call.timeCostChange$.subscribe(cost => this.onTimeCostChange(cost));
  }

  private onTimeCostChange(timeMoneyTuple: { time: number; money: MoneyDto }): void {
    this.callLengthInSeconds = timeMoneyTuple.time;
    this.callCost = timeMoneyTuple.money;
  }
}
