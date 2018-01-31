// tslint:disable:member-ordering
export class PromiseService {

  public static $inject = ['$q', '$timeout'];

    constructor(private $q: ng.IQService,
              private $timeout: ng.ITimeoutService) {
  }

  public setMinimalDelay = <T>(promise: ng.IPromise<T>, minimalDelay: number): ng.IPromise<T> =>
    this.$q.all([
      promise,
      this.$timeout(() => {
      }, minimalDelay)
    ]).then((values) => values[0])

}
