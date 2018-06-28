// tslint:disable:strict-boolean-expressions
// tslint:disable:only-arrow-functions
// tslint:disable:no-any
/* tslint:disable:  no-magic-numbers */

import * as angular from 'angular';

function filter(): (array: any[], searchKey: string, props: string[]) => any[] {
  // tslint:disable-next-line:cyclomatic-complexity
  return function (array: any[], searchKey: string, props: string[]): any[] {
    if (!array || !searchKey || !props) {
      return array;
    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < array.length; i++) {
      const obj = array[i];
      obj.rankSearch = 0;
      for (let j = 0; j < props.length; j++) {
        const index = obj[props[j]].indexOf(searchKey);
        obj.rankSearch += (index === -1 ? 15 : index) * ((j + 1) * 8);
      }
    }

    return array;
  };
}

angular.module('profitelo.filters.rankSearch', [])
  .filter('rankSearch', [filter]);
