export class UpgradeService {

  static $inject = ['$q', '$rootScope'];

  constructor(private $q: ng.IQService, private $rootScope: ng.IRootScopeService) {
  }

  public toIPromise = <T>(promise: Promise<T>): ng.IPromise<T> => {
    const defer = this.$q.defer<T>()

    promise.then(
      (res) => this.$rootScope.$apply(() => defer.resolve(res)),
      (err) => this.$rootScope.$apply(() => defer.reject(err))
    )

    return defer.promise;
  }
}
