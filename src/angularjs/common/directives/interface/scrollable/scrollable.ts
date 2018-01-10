import {Config} from '../../../../app/config';
import * as angular from 'angular';

import IRootElementService = angular.IRootElementService

interface IScrollableDirectiveScope extends ng.IScope {
  isFullscreen: boolean
  isNavbar: boolean
}

class ScrollableDirective implements ng.IDirective<ng.IScope> {
  public template = require('./scrollable.html')
  public restrict: string = 'E'
  public transclude: boolean = true
  public scope = {
    isFullscreen: '<',
    isNavbar: '<'
  }

  private element: IRootElementService
  private directiveHeight: number
  private scrollableContent: JQuery
  private previousScrollableContentHeight: number
  private navbarHeight: number
  private intervalDelay: number = 30
  private static readonly dividerOnHalf: number = 2

  /* @ngInject */
  constructor(private $timeout: ng.ITimeoutService, private $interval: ng.IIntervalService) {
  }

  public link = (scope: IScrollableDirectiveScope, element: ng.IRootElementService, _attr: ng.IAttributes): void => {
    this.element = element
    this.directiveHeight = element.height()
    this.scrollableContent = element.find('.scrollable-center')
    this.previousScrollableContentHeight = this.scrollableContent.height()
    this.navbarHeight = Config.styles.NAVBAR_HEIGHT

    this.$timeout(() => {
      this.centerContent()
      this.setScrollableContainerPosition()
    })

    const interval = this.$interval(this.setNewContainerHeight, this.intervalDelay)

    scope.$on('$destroy', () => {
      this.$interval.cancel(interval)
      angular.element(window).off('resize', this.onWindowResize)
    })

    angular.element(window).on('resize', this.onWindowResize)
  }

  private isNavbarVisible = (): boolean => {
    const isNavbar = this.element.find('.top-modal-navbar')
    return isNavbar.length > 0
  }

  private setScrollableContainerPosition = (): void => {
    this.scrollableContent.css('min-height', this.previousScrollableContentHeight)

    if (this.scrollableContent.outerHeight() +
      ((this.isNavbarVisible()) ? this.navbarHeight : 0) > this.element.height()) {
      this.element.addClass('is-scrollable')
      this.scrollableContent.css('top', 0)
    } else {
      this.element.removeClass('is-scrollable')
      this.scrollableContent.css('top', (this.directiveHeight - ((this.isNavbarVisible()) ?
        this.navbarHeight : 0) - this.scrollableContent.height()) / ScrollableDirective.dividerOnHalf)
    }
  }

  private setNewContainerHeight = (): void => {
    const actualScrollableContentHeight = this.element.find('.scrollable-default-height').height()
    if (this.previousScrollableContentHeight !== actualScrollableContentHeight) {
      this.previousScrollableContentHeight = actualScrollableContentHeight
      this.setScrollableContainerPosition()
    }
  }

  private centerContent = (): void => {
    this.directiveHeight = this.element.height()
    const positionTop = (this.directiveHeight - ((this.isNavbarVisible()) ?
      this.navbarHeight : 0) - this.scrollableContent.height()) / ScrollableDirective.dividerOnHalf

    this.scrollableContent.css({
      top: positionTop,
      'min-height': this.scrollableContent.height()
    })
  }

  private onWindowResize = (): void => {
    this.centerContent()
    this.setScrollableContainerPosition()
  }

  public static getInstance = (): ($timeout: ng.ITimeoutService,
                                   $interval: ng.IIntervalService) => ScrollableDirective => {
    const instance = ($timeout: ng.ITimeoutService,
                      $interval: ng.IIntervalService): ScrollableDirective =>
      new ScrollableDirective($timeout, $interval)
    instance.$inject = ['$timeout', '$interval']
    return instance
  }

}

angular.module('profitelo.directives.interface.scrollable', [
])
  .directive('scrollable', ScrollableDirective.getInstance())
