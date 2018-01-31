const uuidSeparator = '-';

function filter($log: ng.ILogService): (uuid: string) => string {
  return function (uuid: string): string {
    if (uuid) {
      return trimUUID(uuid);
    } else {
      $log.debug('Provided UUID is undefined');
      return '';
    }
  };

  function trimUUID(uuid: string): string {
    const splitUUID = uuid.split(uuidSeparator).pop();

    if (splitUUID) {
      return splitUUID;
    } else {
      $log.error('Provided string can not be split', uuid);
      return '';
    }
  }
}

angular.module('profitelo.filters.uuid-trimmer-filter.uuid-trimmer', [])
  .filter('uuidTrimmer', ['$log', filter]);
