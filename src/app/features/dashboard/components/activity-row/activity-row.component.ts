import { Component, ChangeDetectionStrategy, Input, OnInit, Injector, Output, EventEmitter } from '@angular/core';
import { GetProfileActivity, MoneyDto } from '@anymind-ng/api';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {
  MODAL_CLOSED_WITH_ERROR,
  ActivityDetailsViewComponent,
} from '@platform/shared/components/modals/activity-details/activity-details.view.component';
import { ACTIVITY_DETAILS_DATA } from '@platform/shared/components/modals/activity-details/activity-details-helpers';
import { IProfileActivitiesWithStatus } from '@platform/features/dashboard/views/user-dashboard/activities/views/expert-activities/expert-activities.view.component';

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
  public activityModalClose = new EventEmitter<void>();
  public readonly activityTypes = GetProfileActivity.ActivityTypeEnum;
  public date: Date;
  public operationAmount: MoneyDto;
  public activityType: GetProfileActivity.ActivityTypeEnum;
  public activityDescription?: string;
  public payoutTitle?: string;
  public payoutTitleYear?: string;

  private readonly moneyDivider = 100;

  constructor(private modalService: NgbModal, private injector: Injector) {}

  public ngOnInit(): void {
    this.activityType = this.activity.activityType;
    this.date = new Date(this.activity.initializedAt);
    this.operationAmount = this.activity.financialOperation
      ? this.activity.financialOperation.operation
      : { amount: 0, currency: 'PLN' };
    this.operationAmount.amount = this.operationAmount.amount / this.moneyDivider;
    this.activityDescription = this.activity.serviceName;
    this.payoutTitle = this.mapMonthToPayoutTitleTranslation(this.date.getMonth());
    this.payoutTitleYear = String(this.date.getFullYear());
  }

  public onActivityRowClick = (): void => {
    const profileActivity: IProfileActivitiesWithStatus = {
      activity: this.activity,
      isImportant: this.isImportant,
    };
    const options: NgbModalOptions = {
      injector: Injector.create({
        providers: [{ provide: ACTIVITY_DETAILS_DATA, useValue: profileActivity }],
        parent: this.injector,
      }),
    };
    const modalResult = this.modalService.open(ActivityDetailsViewComponent, options).result;
    /**
     * Emit on resolve and reject because of
     * modal could be close or dismiss
     * You can pass result when closing modal to prevent emit
     */
    if (profileActivity.isImportant) {
      modalResult
        .then(value => {
          if (value !== MODAL_CLOSED_WITH_ERROR) {
            this.activityModalClose.emit();
          }
        })
        .catch(() => {
          this.activityModalClose.emit();
        });

      return;
    }
    /**
     * prevent floating promise
     */
    const noop = (): void => undefined;
    modalResult.then(noop, noop);
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
