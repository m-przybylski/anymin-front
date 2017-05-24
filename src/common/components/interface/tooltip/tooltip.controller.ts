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

  /* @ngInject */
  constructor(private $element: IRootElementService, private $timeout: ng.ITimeoutService) {
  }

  $onInit = () => {
    this.$timeout(() => {
      this.tooltipContentWidth = this.$element.find('.tooltip-content')[0].clientWidth
      this.tooltipStyles = {
        left: -(this.tooltipContentWidth / 2)
      }

      if (this.tooltipContentWidth >= this.maxTooltipWidth) {
        this.isBigText = true
      }
    })
  }

  public onEnter = () => {
    this.isHover = true
  }

  public onLeave = () => {
    this.isHover = false
  }
}
