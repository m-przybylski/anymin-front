// tslint:disable:no-null-keyword
// tslint:disable:no-duplicate-imports
// tslint:disable:no-any
// tslint:disable:newline-before-return
import * as angular from 'angular';
import { IDirective } from 'angular';

function proCalendar(): IDirective<ng.IScope> {

  const maxDateYear = new Date().getFullYear() + 1;
  const maxDateMonth = 5;
  const maxDateDay = 22;
  const dateFormatIndex = 2;

  function linkFunction(scope: any, _element: ng.IRootElementService, _attr: ng.IAttributes): void {
    scope.today = function(): void {
      scope.dt = new Date();
    };
    scope.today();

    scope.clear = function(): void {
      scope.dt = null;
    };

    function getDayClass(data: any): string {
      const date = data.date;
      const mode = data.mode;
      if (mode === 'day') {
        const dayToCheck = new Date(date).setHours(0, 0, 0, 0);

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < scope.events.length; i++) {
          const currentDay = new Date(scope.events[i].date).setHours(0, 0, 0, 0);

          if (dayToCheck === currentDay) {
            return scope.events[i].status;
          }
        }
      }

      return '';
    }

    scope.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: false
    };

    scope.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(maxDateYear, maxDateMonth, maxDateDay),
      startingDay: 1,
      showWeeks: true,
      dateDisabled: disabled
    };

    function isDisabledDateDateFrom(data: any): boolean {

      if (data.date.getTime() > new Date().getTime()) {
        return true;
      }

      if (scope.dateTo === '' || scope.dateTo === null) {
        return false;
      }

      return data.date.getTime() > scope.dateTo.getTime();
    }

    function isDisabledDateDateTo(data: any): boolean {

      if (data.date.getTime() > new Date().getTime()) {
        return true;
      }

      if (scope.dateFrom === '' || scope.dateFrom === null) {
        return false;
      }

      return data.date.getTime() < scope.dateFrom.getTime();
    }

    function disabled(data: any): boolean {
      // This is made only for demo purposes, whole calendar logic should be rewritten, this is shiet
      if (scope.defaultValue === 'dateFrom') {
        return isDisabledDateDateFrom(data);
      } else if (scope.defaultValue === 'dateTo') {
        return isDisabledDateDateTo(data);
      }
      return false;
    }

    scope.toggleMin = function(): void {
      scope.inlineOptions.minDate = scope.inlineOptions.minDate ? null : new Date();
      scope.dateOptions.minDate = scope.inlineOptions.minDate;
    };

    scope.toggleMin();

    scope.open1 = function(): void {
      scope.popup1.opened = true;
    };

    scope.open2 = function(): void {
      scope.popup2.opened = true;
    };

    scope.setDate = function(year: number, month: number, day: number): void {
      scope.dt = new Date(year, month, day);
    };

    scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    scope.format = scope.formats[dateFormatIndex];
    scope.altInputFormats = ['M!/d!/yyyy'];

    scope.popup1 = {
      opened: false
    };

    scope.popup2 = {
      opened: false
    };

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    scope.events = [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  }

  return {
    template: require('./pro-calendar.html'),
    restrict: 'E',
    replace: true,
    link: linkFunction,
    scope: {
      ngModel: '=',
      dateFrom: '=',
      dateTo: '=',
      placeholder: '@',
      defaultValue: '@',
      label: '@'
    }
  };
}

angular.module('profitelo.directives.interface.pro-calendar', [
  'ui.bootstrap'
])
  .directive('proCalendar', [proCalendar]);
