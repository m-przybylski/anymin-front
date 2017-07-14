import * as angular from 'angular'
import {IWindowService} from '../../../services/window/window.service'
import './collapse-btn.sass'

/* @ngInject */
function controller($log: ng.ILogService, $element: ng.IRootElementService, $window: IWindowService) {
  this.stylesObject = {
    height: null
  }

  this.isCollapsed = true

  const updateStylesObject = () => {
    if (!this.isCollapsed) {
      this.stylesObject.height = getCollapseBtnContentHeight()
    } else {
      this.stylesObject.height = getCollapseBtnHeight()
    }
  }

  this.collapseToggle = () => {
    this.isCollapsed = !this.isCollapsed
    updateStylesObject()
  }

  this.$doCheck = () => {
    this.onWindowResize()
  }

  const getCollapseBtnHeight = () => {
    const _element = $element.find('.collapse-btn-header')[0]
    if (!!_element) {
      return _element.clientHeight
    } else {
      $log.error('Element not found')
      return 0
    }
  }

  const getCollapseBtnContentHeight = () => {
    const _element = $element.find('.collapse-btn-wrapper')[0]
    if (!!_element) {
      return _element.clientHeight
    } else {
      $log.error('Element not found')
      return 0
    }
  }

  /* istanbul ignore next */
  this.onWindowResize = () => {
    if (!this.isCollapsed) {
      this.stylesObject.height = getCollapseBtnContentHeight()
    }
    else {
      this.stylesObject.height = getCollapseBtnHeight()
    }
  }

  /* istanbul ignore next */
  angular.element($window).on('resize', this.onWindowResize)

  return this
}

const component = {
  template: require('./collapse-btn.pug')(),
  controllerAs: '$ctrl',
  transclude: true,
  controller: controller,
  bindings: {
    title: '@',
    collapseIcon: '@'
  }
}

angular.module('profitelo.components.interface.collapse-btn', [
  'pascalprecht.translate'
])
.component('collapseBtn', component)
