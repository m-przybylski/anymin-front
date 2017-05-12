import * as angular from 'angular'

function proCalendar() {

  function linkFunction(scope: any, _element: ng.IRootElementService, _attr: ng.IAttributes) {
    scope.today = function () {
      scope.dt = new Date()
    }
    scope.today()

    scope.clear = function () {
      scope.dt = null
    }

    function getDayClass(data: any) {
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
      maxDate: new Date(2020, 5, 22),
      startingDay: 1,
      showWeeks: false
    }

    scope.toggleMin = function () {
      scope.inlineOptions.minDate = scope.inlineOptions.minDate ? null : new Date()
      scope.dateOptions.minDate = scope.inlineOptions.minDate
    }

    scope.toggleMin()

    scope.open1 = function () {
      scope.popup1.opened = true
    }

    scope.open2 = function () {
      scope.popup2.opened = true
    }

    scope.setDate = function (year: number, month: number, day: number) {
      scope.dt = new Date(year, month, day)
    }

    scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate']
    scope.format = scope.formats[2]
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
    template: require('./pro-calendar.pug')(),
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

angular.module('profitelo.directives.interface.pro-calendar', [])
  .directive('proCalendar', proCalendar)
