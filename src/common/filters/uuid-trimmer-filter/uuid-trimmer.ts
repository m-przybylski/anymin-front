const uuidSeparator = '-'

function filter($log: ng.ILogService): (uuid: string) => string {
  return function (uuid: string): string {
    if (uuid) {
      return _.last(uuid.split(uuidSeparator))
    } else {
      $log.error('Provided UUID is undefined')
      return ''
    }
  }
}

angular.module('profitelo.filters.uuid-trimmer-filter.uuid-trimmer', [])
  .filter('uuidTrimmer', filter)
