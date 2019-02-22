import { Component, Injector, Input, OnDestroy } from '@angular/core';
import { TooltipContentComponent } from '@platform/shared/components/tooltip/tooltip-content/tooltip-content.component';
import {
  DESCRIPTION,
  DOM_DESTINATION,
  OFFSETS,
  TooltipInjectorService,
} from '@platform/shared/components/tooltip/tooltip-injector.service';
import { catchError, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { TooltipService } from '@platform/shared/components/tooltip/tooltip.service';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { ITooltipModalOffsets } from '@platform/shared/components/tooltip/tooltip.directive';

export enum TooltipComponentDestinationEnum {
  COMPONENT,
  MODAL,
  BODY,
}

@Component({
  selector: 'plat-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.sass'],
  providers: [TooltipInjectorService],
})
export class TooltipComponent extends Logger implements OnDestroy {
  @Input()
  public iconClass = 'questionmark';

  @Input()
  public tooltipText: string;

  @Input()
  public tooltipType: TooltipComponentDestinationEnum = TooltipComponentDestinationEnum.BODY;

  public isVisible = false;

  constructor(
    private domService: TooltipInjectorService,
    private alertService: AlertService,
    private tooltipService: TooltipService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('TooltipComponent'));
  }

  public toggleTooltip = (isVisible: boolean): void => {
    this.isVisible = isVisible;

    if (this.isVisible) {
      this.getTooltipHeaderPosition();
    } else {
      this.domService.removeComponent();
    }
  };

  public ngOnDestroy(): void {
    this.domService.removeComponent();
  }

  private getTooltipHeaderPosition = (): void => {
    this.tooltipService.tooltipPosition
      .pipe(
        catchError(err => {
          this.loggerService.error('Can nog get tooltip position: ', err);
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

          return EMPTY;
        }),
        take(1),
      )
      .subscribe(res => {
        this.createTooltipContentComponent(res);
      });
  };

  private createTooltipContentComponent = (tooltipHeaderOffset: ITooltipModalOffsets): void => {
    const injector = Injector.create({
      providers: [
        { provide: DESCRIPTION, useValue: this.tooltipText },
        { provide: DOM_DESTINATION, useValue: this.tooltipType },
        { provide: OFFSETS, useValue: tooltipHeaderOffset },
      ],
    });

    this.domService.createComponentRef(TooltipContentComponent, injector);
  };
}
