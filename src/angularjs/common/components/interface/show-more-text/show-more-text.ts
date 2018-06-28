// tslint:disable:newline-before-return
import * as angular from 'angular';
import { IFilterService } from '../../../services/filter/filter.service';
import { IWindowService } from '../../../services/window/window.service';

function showMoreTextController($filter: IFilterService, $log: ng.ILogService, $timeout: ng.ITimeoutService,
                                $window: IWindowService, $scope: ng.IScope): void {

  const collapsibleLength = 300;
  this.isCollapsed = false;

  this.$onInit = (): void => {
    this.isCollapsible = (this.text.length > collapsibleLength);
    this.textShort = $filter('limitTo')(this.text, collapsibleLength, 0);
    this.textLong = $filter('limitTo')(this.text, this.text.length, collapsibleLength);
  };

  this.descriptionStyles = {
    height: null
  };

  const getTextShortElementHeight = (): number => {
    const _element = angular.element('.short-text')[0];
    if (!!_element) {
      return _element.offsetHeight;
    } else {
      $log.error('Element not found');
      return 0;
    }
  };

  const getTextLongElementHeight = (): number => {
    const _element = angular.element('.description > p')[0];
    if (!!_element) {
      return _element.offsetHeight;
    } else {
      $log.error('Element not found');
      return 0;
    }
  };

  const updateHeight = (): void => {
    if (this.isCollapsed === true) {
      this.descriptionStyles.height = getTextLongElementHeight();
    } else {
      this.descriptionStyles.height = getTextShortElementHeight();
    }
  };

  this.showMoreText = (): void => {
    this.isCollapsed = !this.isCollapsed;
    updateHeight();
  };

  $timeout(updateHeight);

  angular.element($window).on('resize', () => {
    updateHeight();
    $scope.$digest();
  });

  return this;
}

const showMoreText = {
  transclude: true,
  template: require('./show-more-text.html'),
  bindings: {
    text: '@'
  },
  controller: ['$filter', '$log', '$timeout', '$window', '$scope', showMoreTextController]
};

angular.module('profitelo.components.interface.show-more-text', [
  'pascalprecht.translate'
])
  .component('showMoreText', showMoreText);
