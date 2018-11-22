import { Component, ChangeDetectionStrategy, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GetProfileActivity, MoneyDto } from '@anymind-ng/api';

@Component({
  selector: 'plat-activity-row',
  templateUrl: './activity-row.component.html',
  styleUrls: ['./activity-row.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityRowComponent implements OnInit {
  @Input()
  public activity: GetProfileActivity;
  @Input()
  public isImportant = false;

  @Output()
  public activityRowClicked = new EventEmitter<GetProfileActivity>();
  public readonly activityTypes = GetProfileActivity.ActivityTypeEnum;
  public date: Date;
  public operationAmount: MoneyDto;
  public activityType: GetProfileActivity.ActivityTypeEnum;
  public activityDescription?: string;
  public payoutTitle?: string;
  public payoutTitleYear?: string;

  public ngOnInit(): void {
    this.activityType = this.activity.activityType;
    this.date = new Date(this.activity.initializedAt);
    this.operationAmount = this.activity.financialOperation
      ? { ...this.activity.financialOperation.operation }
      : { amount: 0, currency: 'PLN' };
    this.activityDescription = this.activity.serviceName;
    this.payoutTitle = this.mapMonthToPayoutTitleTranslation(this.date.getMonth());
    this.payoutTitleYear = String(this.date.getFullYear());
  }

  public onActivityRowClick = (): void => {
    this.activityRowClicked.emit(this.activity);
  };

  public getDividedAmount = (amount: number): number => {
    const moneyDivider = 100;

    return amount / moneyDivider;
  };

  private mapMonthToPayoutTitleTranslation = (monthIndex: number): string => {
    const monthNames: ReadonlyArray<string> = [
      'JANUARY',
      'FEBRUARY',
      'MARCH',
      'APRIL',
      'MAY',
      'JUNE',
      'JULY',
      'AUGUST',
      'SEPTEMBER',
      'OCTOBER',
      'NOVEMBER',
      'DECEMBER',
    ];
    const translationKey = 'DASHBOARD_ACTIVITY.PAYOUT_TITLE_';

    return translationKey + monthNames[monthIndex];
  };
}
