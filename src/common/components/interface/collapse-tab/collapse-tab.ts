import * as angular from 'angular'
import {SmoothScrollingService} from '../../../services/smooth-scrolling/smooth-scrolling.service'
import {IWindowService} from '../../../services/window/window.service'
import smoothScrollingModule from '../../../services/smooth-scrolling/smooth-scrolling'

/* @ngInject */
function controller($element: ng.IRootElementService, smoothScrollingService: SmoothScrollingService,
                    $window: IWindowService, $log: ng.ILogService, $scope: ng.IScope, $timeout: ng.ITimeoutService) {
  this.stylesObject = {
    height: null
  }

  this.isCollapsed = false

  const getFirstCollapseElementHeight = () => {
    const firstCollapseElement = $element.find('ng-transclude > div:first-child')
    if (firstCollapseElement) {
      return firstCollapseElement.height()
    } else {
      $log.error('In method getFirstCollapseElementHeight: element div:first-child not found')
      return 0
    }
  }

  const getCollapseWrapperHeight = () => {
    return $element.find('.collapse-content').height()
  }

  /* istanbul ignore next */
  const onWindowResize = () => {
    if (this.isCollapsed) {
      this.stylesObject.height = getCollapseWrapperHeight()
    } else {
      this.stylesObject.height = getFirstCollapseElementHeight()
    }
    $scope.$digest()
  }

  $timeout(() => {
    this.stylesObject.height = getFirstCollapseElementHeight()
  })

  /* istanbul ignore next */
  angular.element($window).on('resize', onWindowResize)

  this.toggleCollapse = () => {
    this.stylesObject.height = this.stylesObject.height !== getCollapseWrapperHeight() ?
      getCollapseWrapperHeight() : getFirstCollapseElementHeight()

    this.isCollapsed = !this.isCollapsed
    if (this.stylesObject.height !== getCollapseWrapperHeight()) {
      smoothScrollingService.simpleScrollTo('#collapseWrap', true, 1000)
    }
  }

  this.checkedHeight = () => {
    return getFirstCollapseElementHeight() === getCollapseWrapperHeight()
  }


  return this
}

const collapseTab = {
  template: require('./collapse-tab.pug')(),
  controllerAs: '$ctrl',
  transclude: true,
  controller: controller
}


angular.module('profitelo.components.interface.collapse-tab', [
  smoothScrollingModule
])
  .component('collapseTab', collapseTab)
