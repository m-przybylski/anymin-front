// tslint:disable:strict-boolean-expressions
// tslint:disable:only-arrow-functions
// tslint:disable:newline-before-return
import * as angular from 'angular';

function objectSizeFilter(): {} {
  return (obj: {}): number => {
    const keys = Object.keys(obj);
    return keys ? keys.length : 0;
  };
}

angular.module('profitelo.filters.object-size-filter', [])
  .filter('objSize', [objectSizeFilter]);
