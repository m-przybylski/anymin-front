import * as angular from 'angular'
import {IDirective} from 'angular'

function proCalendar(): IDirective<ng.IScope> {

  const maxDateYear: number = new Date().getFullYear() + 1
  const maxDateMonth: number = 5
  const maxDateDay: number = 22
  const dateFormatIndex: number = 2

  function linkFunction(scope: any, _element: ng.IRootElementService, _attr: ng.IAttributes): void {
    scope.today = function (): void {
      scope.dt = new Date()
    }
    scope.today()

    scope.clear = function (): void {
      scope.dt = null
    }

    function getDayClass(data: any): string {
      const date = data.date,
        mode = data.mode
      if (mode === 'day') {
        const dayToCheck = new Date(date).setHours(0, 0, 0, 0)

        for (let i = 0; i < scope.events.length; i++) {
          const currentDay = new Date(scope.events[i].date).setHours(0, 0, 0, 0)

          if (dayToCheck === currentDay) {
            return scope.events[i].status
          }
        }
      }

      return ''
    }

    scope.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: false
    }

    scope.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(maxDateYear, maxDateMonth, maxDateDay),
      startingDay: 1,
      showWeeks: false
    }

    scope.toggleMin = function (): void {
      scope.inlineOptions.minDate = scope.inlineOptions.minDate ? null : new Date()
      scope.dateOptions.minDate = scope.inlineOptions.minDate
    }

    scope.toggleMin()

    scope.open1 = function (): void {
      scope.popup1.opened = true
    }

    scope.open2 = function (): void {
      scope.popup2.opened = true
    }

    scope.setDate = function (year: number, month: number, day: number): void {
      scope.dt = new Date(year, month, day)
    }

    scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate']
    scope.format = scope.formats[dateFormatIndex]
    scope.altInputFormats = ['M!/d!/yyyy']

    scope.popup1 = {
      opened: false
    }

    scope.popup2 = {
      opened: false
    }

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const afterTomorrow = new Date()
    afterTomorrow.setDate(tomorrow.getDate() + 1)
    scope.events = [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ]

  }

  return {
    template: require('./pro-calendar.html'),
    restrict: 'E',
    replace: true,
    link: linkFunction,
    scope: {
      ngModel: '=',
      placeholder: '@',
      defaultValue: '@',
      label: '@'
    }
  }
}

angular.module('profitelo.directives.interface.pro-calendar', [
  'ui.bootstrap'
])
  .directive('proCalendar', [proCalendar])
