import * as angular from 'angular'
import {ITooltipComponentBindings} from './tooltip'
import IRootElementService = angular.IRootElementService

export interface ITooltipStyles {
  left: number
}

export class TooltioComponentController implements ITooltipComponentBindings {
  public tooltipText: string
  public tooltipStyles: ITooltipStyles
  public isHover: boolean = false
  public isBigText: boolean = false
  private tooltipContentWidth: number
  private maxTooltipWidth: number = 280
  private static readonly dividerOnHalf: number = 2
  private static readonly maxMobilePhoneWidth: number = 480

  /* @ngInject */
  constructor(private $element: IRootElementService,
              private $timeout: ng.ITimeoutService,
              private $window: ng.IWindowService) {
  }

  $onInit = (): void => {
    this.$timeout(() => {
      this.adjustTooltipPosition()

      if (this.tooltipContentWidth >= this.maxTooltipWidth) {
        this.isBigText = true
      }
    })

    angular.element(this.$window).on('resize', () => {
      this.adjustTooltipPosition()
    })
  }

  public onEnter = (): void => {
    this.isHover = true
  }

  public onLeave = (): void => {
    this.isHover = false
  }

  private adjustTooltipPosition = (): void => {
    this.tooltipContentWidth = this.$element.find('.tooltip-content')[0].clientWidth
    if (this.$window.innerWidth < TooltioComponentController.maxMobilePhoneWidth) {
      this.tooltipStyles = {
        left: 0
      }
    } else {
      this.tooltipStyles = {
        left: -(this.tooltipContentWidth / TooltioComponentController.dividerOnHalf)
      }
    }
  }
}
