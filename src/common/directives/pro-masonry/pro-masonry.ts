import * as angular from 'angular'
import 'jquery-bridget'
import 'masonry-layout/dist/masonry.pkgd'
import 'angular-masonry'
import {IDirective} from 'angular'
const ngMasonry = require('ng-masonry')

const $ = require('jquery');
const jQueryBridget = require('jquery-bridget');
const Masonry = require('masonry-layout');
// make Masonry a jQuery plugin
jQueryBridget( 'masonry', Masonry, $ );

function proMasonry($timeout: ng.ITimeoutService, $log: ng.ILogService): IDirective<ng.IScope> {

  function linkFunction(_scope: ng.IScope, element: any, attr: any): void {

    if (angular.isUndefined(attr.gridItem)) {
      $log.error('gridItem attribute has to be given in order for the directive to initialize')
    }

    $timeout(() => {
      element.masonry({
        itemSelector: attr.gridItem
      })
    })

  }

  return {
    restrict: 'A',
    link: linkFunction
  }
}

angular.module('profitelo.directives.pro-masonry', [ngMasonry])
  .directive('proMasonry', proMasonry)
