// tslint:disable:only-arrow-functions
import * as angular from 'angular';

function semicolonToCommaInputFilter(): (input: string) => string {
  return function (input: string): string {

    return input.replace(',', '.');
  };
}

angular.module('profitelo.filters.input-filter.semicolon-to-comma-input-filter', [])
  .filter('semicolonToCommaInputFilter', [semicolonToCommaInputFilter]);
