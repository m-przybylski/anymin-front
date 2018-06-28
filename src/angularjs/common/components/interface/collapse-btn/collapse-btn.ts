// tslint:disable:strict-boolean-expressions
// tslint:disable:prefer-conditional-expression
// tslint:disable:no-require-imports
// tslint:disable:no-null-keyword
// tslint:disable:no-invalid-this
// tslint:disable:newline-before-return
// tslint:disable:curly
import * as angular from 'angular';
import { IWindowService } from '../../../services/window/window.service';

// tslint:disable:no-use-before-declare
function controller($log: ng.ILogService, $element: ng.IRootElementService, $window: IWindowService): void {
  this.stylesObject = {
    height: null
  };

  this.isCollapsed = true;

  this.$onInit = (): void => {
    if (this.collapseStream)
      this.collapseStream.subscribe(this.collapseToggle);
  };

  const updateStylesObject = (): void => {
    if (!this.isCollapsed) {
      this.stylesObject.height = getCollapseBtnContentHeight();
    } else {
      this.stylesObject.height = getCollapseBtnHeight();
    }
  };

  this.collapseToggle = (): void => {
    this.isCollapsed = !this.isCollapsed;
    updateStylesObject();
  };

  this.$doCheck = (): void => {
    this.onWindowResize();
  };

  const getCollapseBtnHeight = (): number => {
    const _element = $element.find('.collapse-btn-header')[0];
    if (!!_element) {
      return _element.clientHeight;
    } else {
      $log.error('Element not found');
      return 0;
    }
  };

  const getCollapseBtnContentHeight = (): number => {
    const _element = $element.find('.collapse-btn-wrapper')[0];
    if (!!_element) {
      return _element.clientHeight;
    } else {
      $log.error('Element not found');
      return 0;
    }
  };

    this.onWindowResize = (): void => {
    if (!this.isCollapsed) {
      this.stylesObject.height = getCollapseBtnContentHeight();
    }
    else {
      this.stylesObject.height = getCollapseBtnHeight();
    }
  };

    angular.element($window).on('resize', this.onWindowResize);

  return this;
}

const component = {
  template: require('./collapse-btn.html'),
  controllerAs: '$ctrl',
  transclude: true,
  controller: ['$log', '$element', '$window', controller],
  bindings: {
    title: '@',
    collapseIcon: '@',
    collapseStream: '<'
  }
};

angular.module('profitelo.components.interface.collapse-btn', [
  'pascalprecht.translate'
])
.component('collapseBtn', component);
