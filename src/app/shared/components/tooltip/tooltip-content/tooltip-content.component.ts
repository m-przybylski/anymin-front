import { Component, Input } from '@angular/core';
import { TooltipService } from '@platform/shared/components/tooltip/tooltip.service';
import { ITooltipModalOffsets } from '@platform/shared/components/tooltip/tooltip.directive';
import { TooltipComponentDestinationEnum } from '@platform/shared/components/tooltip/tooltip.component';
import { catchError, take } from 'rxjs/operators';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'plat-tooltip-content',
  templateUrl: './tooltip-content.component.html',
  styleUrls: ['./tooltip-content.component.sass'],
})
export class TooltipContentComponent extends Logger {
  @Input()
  public description: string;

  @Input()
  public DOMDestination: TooltipComponentDestinationEnum;

  @Input()
  public tooltipHeaderPosition: ITooltipModalOffsets;

  constructor(
    private tooltipService: TooltipService,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('TooltipContentComponent'));

    this.tooltipService.tooltipPosition
      .pipe(
        catchError(err => {
          this.loggerService.error('Can nog get tooltip position: ', err);
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

          return EMPTY;
        }),
        take(1),
      )
      .subscribe(tooltipHeaderOffset => {
        this.tooltipHeaderPosition = tooltipHeaderOffset;
      });
  }
}
