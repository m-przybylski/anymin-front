import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GetProfileActivity, MoneyDto } from '@anymind-ng/api';
import { ActivityListTypeEnum } from '@platform/features/dashboard/views/activities/activities.interface';

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

  public ngOnInit(): void {
    this.activityType = this.activity.activityType;
    this.date = new Date(this.activity.initializedAt);
    this.operationAmount = this.activity.amount ? { ...this.activity.amount } : { value: 0, currency: 'PLN' };
    this.activityDescription = this.activity.serviceName;
    this.payoutTitle = this.mapMonthToPayoutTitleTranslation(this.date.getMonth());
    this.payoutTitleYear = String(this.date.getFullYear());
    if (
      this.activityType === GetProfileActivity.ActivityTypeEnum.SERVICEUSAGEEVENT &&
      typeof this.activity.serviceUsageDetails !== 'undefined'
    ) {
      if (this.listType === ActivityListTypeEnum.COMPANY) {
        this.participantName = this.activity.serviceUsageDetails.expertName;

        return;
      }
      // TODO https://anymind.atlassian.net/browse/PLAT-691 - for now blocked by backend
      this.participantName = 'DASHBOARD_ACTIVITY.ANONYMOUS_CONSULTANT';
    }
  }

  public onActivityRowClick = (): void => {
    this.activityRowClicked.emit(this.activity);
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
