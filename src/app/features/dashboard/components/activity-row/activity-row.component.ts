import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GetProfileActivity, MoneyDto } from '@anymind-ng/api';
import { ActivityListTypeEnum, IActivity } from '@platform/features/dashboard/views/activities/activities.interface';

@Component({
  selector: 'plat-activity-row',
  templateUrl: './activity-row.component.html',
  styleUrls: ['./activity-row.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityRowComponent implements OnInit {
  @Input()
  public activity: IActivity;
  @Input()
  public isImportant = false;

  @Input()
  public listType: ActivityListTypeEnum;

  @Output()
  public activityRowClicked = new EventEmitter<GetProfileActivity>();

  public readonly activityTypes = GetProfileActivity.ActivityTypeEnum;
  public date: Date;
  public operationAmount: MoneyDto;
  public activityType: GetProfileActivity.ActivityTypeEnum;
  public activityDescription?: string;
  public payoutTitle?: string;
  public payoutTitleYear?: string;
  public participantName: string;
  public moneySign = '';

  public ngOnInit(): void {
    this.activityType = this.activity.activityType;
    this.date = new Date(this.activity.initializedAt);
    this.payoutTitle = this.mapMonthToPayoutTitleTranslation(this.date.getMonth());
    this.payoutTitleYear = String(this.date.getFullYear());

    if (typeof this.activity.expertDetails !== 'undefined') {
      this.operationAmount = this.activity.expertDetails.amount
        ? { ...this.activity.expertDetails.amount }
        : {
            value: 0,
            currency: 'PLN',
          };
      this.activityDescription = this.activity.expertDetails.serviceName;
      this.participantName = this.activity.expertDetails.expertName ? this.activity.expertDetails.expertName : '';
    } else {
      this.operationAmount = this.activity.amount ? { ...this.activity.amount } : { value: 0, currency: 'PLN' };
      this.activityDescription = this.activity.serviceName;
      this.participantName = this.getParticipantName();
      this.moneySign = '+';
    }
  }

  public onActivityRowClick(): void {
    this.activityRowClicked.emit(this.activity);
  }

  private mapMonthToPayoutTitleTranslation(monthIndex: number): string {
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
  }

  private getParticipantName(): string {
    if (
      this.activityType === GetProfileActivity.ActivityTypeEnum.SERVICEUSAGEEVENT &&
      typeof this.activity.serviceUsageDetails !== 'undefined'
    ) {
      return this.listType === ActivityListTypeEnum.COMPANY
        ? this.activity.serviceUsageDetails.expertName
        : 'DASHBOARD_ACTIVITY.ANONYMOUS_CONSULTANT';
    }

    return '';
  }
}
