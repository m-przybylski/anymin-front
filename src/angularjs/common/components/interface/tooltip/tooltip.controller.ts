import * as angular from 'angular';
import { ITooltipComponentBindings } from './tooltip';
import IRootElementService = angular.IRootElementService;

export interface ITooltipStyles {
  left: number;
}

// tslint:disable:member-ordering
export class TooltioComponentController implements ITooltipComponentBindings {
  public tooltipText: string;
  public tooltipStyles: ITooltipStyles;
  public isHover = false;
  public isBigText = false;
  private tooltipContentWidth: number;
  private maxTooltipWidth = 280;
  private static readonly dividerOnHalf = 2;
  private static readonly maxMobilePhoneWidth = 480;

  public static $inject = ['$element', '$timeout', '$window'];

    constructor(private $element: IRootElementService,
              private $timeout: ng.ITimeoutService,
              private $window: ng.IWindowService) {
  }

  public $onInit = (): void => {
    this.$timeout(() => {
      this.adjustTooltipPosition();

      if (this.tooltipContentWidth >= this.maxTooltipWidth) {
        this.isBigText = true;
      }
    });

    angular.element(this.$window).on('resize', () => {
      this.adjustTooltipPosition();
    });
  }

  public onEnter = (): void => {
    this.isHover = true;
  }

  public onLeave = (): void => {
    this.isHover = false;
  }

  private adjustTooltipPosition = (): void => {
    this.tooltipContentWidth = this.$element.find('.tooltip-content')[0].clientWidth || this.maxTooltipWidth;
    if (this.$window.innerWidth < TooltioComponentController.maxMobilePhoneWidth) {
      this.tooltipStyles = {
        left: 0
      };
    } else {
      this.tooltipStyles = {
        left: -(this.tooltipContentWidth / TooltioComponentController.dividerOnHalf)
      };
    }
  }
}
