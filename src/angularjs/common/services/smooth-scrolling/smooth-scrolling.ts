import * as angular from 'angular';
import { SmoothScrollingService } from './smooth-scrolling.service';

const smoothScrollingModule  = angular.module('profitelo.services.smooth-scrolling', [])
  .config(['$qProvider', ($qProvider: ng.IQProvider): any => {
    $qProvider.errorOnUnhandledRejections(true);
  }])
  .service('smoothScrollingService', SmoothScrollingService)
  .name;

export default smoothScrollingModule;
