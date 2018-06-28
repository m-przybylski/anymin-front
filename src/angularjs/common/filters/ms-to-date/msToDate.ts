// tslint:disable:newline-before-return
import * as angular from 'angular';

function filter(): (milliseconds: number) => Date {
  return function (milliseconds: number): Date {
    const date = new Date(0, 0, 0, 0, 0, 0, 0);
    date.setMilliseconds(milliseconds);
    return date;
  };
}

angular.module('profitelo.filters.milliseconds-to-datetime', [])
  .filter('millisecondsToDatetime', [filter]);
