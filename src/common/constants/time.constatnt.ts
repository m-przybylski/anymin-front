namespace profitelo.constants.time {

  export interface ITimeConstant {
    USER_ACTIVITY_LAST_MINUTE: number
  }

  class TimeConstant implements ITimeConstant {
    public readonly USER_ACTIVITY_LAST_MINUTE = 600000
  }

  angular.module('profitelo.constants.time', [])
  .constant('timeConstant', new TimeConstant())
}
