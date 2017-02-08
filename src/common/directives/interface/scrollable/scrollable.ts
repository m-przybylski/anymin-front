namespace profitelo.directives.scrollable {

  import IRootElementService = angular.IRootElementService
  import IStyleConstant = profitelo.constants.style.IStyleConstant

  interface IScrollableDirectiveScope extends ng.IScope {
    isFullscreen: boolean
    isNavbar: boolean
  }

  class ScrollableDirective implements ng.IDirective {
    public templateUrl: string = 'directives/interface/scrollable/scrollable.tpl.html'
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

    /* ngInject */
    constructor(private $timeout: ng.ITimeoutService, private $interval: ng.IIntervalService,
                private styleConstant: IStyleConstant) {
    }

    public link = (scope: IScrollableDirectiveScope, element: ng.IRootElementService, _attr: ng.IAttributes) => {
      this.element = element
      this.directiveHeight = element.height()
      this.scrollableContent = element.find('.scrollable-center')
      this.previousScrollableContentHeight = this.scrollableContent.height()
      this.navbarHeight = this.styleConstant.NAVBAR_HEIGHT

      this.$timeout(() => {
        this.centerContent()
        this.setScrollableContainerPosition()
      })

      const interval = this.$interval(this.setNewContainerHeight, this.intervalDelay)

      scope.$on("$destroy", () => {
        this.$interval.cancel(interval)
        angular.element(window).off('resize', this.onWindowResize)
      })

      angular.element(window).on('resize', this.onWindowResize)
    }

    private isNavbarVisible = (): boolean => {
      let isNavbar = this.element.find(".top-modal-navbar")
      return isNavbar.length > 0
    }

    private setScrollableContainerPosition = () => {
      this.scrollableContent.css('min-height', this.scrollableContent.height())

      if (this.scrollableContent.outerHeight() + ((this.isNavbarVisible()) ? this.navbarHeight : 0) > this.element.height()) {
        this.element.addClass('is-scrollable')
        this.scrollableContent.css('top', (this.isNavbarVisible()) ? 32 : 0)
      } else {
        this.element.removeClass('is-scrollable')
        this.scrollableContent.css('top', (this.directiveHeight - ((this.isNavbarVisible()) ? this.navbarHeight : 0) - this.scrollableContent.height()) / 2)
      }
    }

    private setNewContainerHeight = () => {
      const actualScrollableContentHeight = this.element.find('.scrollable-center').height()
      if (this.previousScrollableContentHeight !== actualScrollableContentHeight) {
        this.previousScrollableContentHeight = actualScrollableContentHeight
        this.setScrollableContainerPosition()
      }
    }

    private centerContent = () => {
      this.directiveHeight = this.element.height()
      let positionTop = (this.directiveHeight - ((this.isNavbarVisible()) ? this.navbarHeight : 0) - this.scrollableContent.height()) / 2

      this.scrollableContent.css({
        'top': positionTop,
        'min-height': this.scrollableContent.height()
      })
    }

    private onWindowResize = () => {
      this.centerContent()
      this.setScrollableContainerPosition()
    }

    public static getInstance = () => {
      const instance = ($timeout: ng.ITimeoutService, $interval: ng.IIntervalService, styleConstant: IStyleConstant) =>
        new ScrollableDirective($timeout, $interval, styleConstant)
      instance.$inject = ['$timeout', '$interval', 'styleConstant']
      return instance
    }

  }

  angular.module('profitelo.directives.interface.scrollable', [
    'profitelo.constants.style'
  ])
  .directive('scrollable', ScrollableDirective.getInstance())
}
