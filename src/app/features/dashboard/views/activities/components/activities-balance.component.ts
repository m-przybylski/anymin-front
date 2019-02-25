import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivityListTypeEnum } from '@platform/features/dashboard/views/activities/activities.interface';
import { GetProfileBalance, MoneyDto } from '@anymind-ng/api';
import { TooltipComponentDestinationEnum } from '@platform/shared/components/tooltip/tooltip-injector.service';

@Component({
  selector: 'plat-activities-balance',
  templateUrl: './activities-balance.component.html',
  styleUrls: ['./activities-balance.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivitiesBalanceComponent {
  @Input()
  public balance: GetProfileBalance;
  @Input()
  public combinedBalance: MoneyDto;
  @Input()
  public combinedBlockedBalance: MoneyDto;
  @Input()
  public isLoaded: boolean;
  @Input()
  public activityListType: ActivityListTypeEnum;

  public tooltipType = TooltipComponentDestinationEnum.BODY;
  public activityListTypeEnum = ActivityListTypeEnum;
}
