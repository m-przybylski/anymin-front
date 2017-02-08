namespace profitelo.services.topWaitingLoader {

  import IRootScopeService = profitelo.services.rootScope.IRootScopeService

  export interface ITopWaitingLoaderService {
    bindProgress(cb: (progress: number) => void): void
    immediate(): void
    stopLoader(): void
  }

  class TopWaitingLoaderService implements ITopWaitingLoaderService {

    private bindedProgress: (progress: number) => void
    private immediateInProgress: boolean
    private currentProgress: number
    private immediateInterval

    constructor($rootScope: IRootScopeService, private $timeout: ng.ITimeoutService,
                private $interval: ng.IIntervalService) {

      this.immediateInProgress = false
      this.currentProgress = 0

      $rootScope.$on('$stateChangeSuccess', () => {
        $timeout(this.stopLoadingProcess)
      })
    }

    public bindProgress = (progress) => {
      this.currentProgress = 0
      this.bindedProgress = progress
      this.bindedProgress(this.currentProgress)
    }

    public stopLoader = () => {
      this.$timeout(this.stopLoadingProcess)
    }

    public immediate = () => {
      this.$timeout(this.startImmediateLoading)
    }

    private stopLoadingProcess = () => {
      this.$interval.cancel(this.immediateInterval)
      this.immediateInProgress = false
      this.currentProgress = 100
      this.bindedProgress(this.currentProgress)
      this.currentProgress = 0
      this.bindedProgress(this.currentProgress)
    }

    private startImmediateLoading = () => {
      if (!this.immediateInProgress) {
        this.immediateInProgress = true
        this.immediateInterval = this.$interval(() => {
          if (this.currentProgress > 100) {
            this.$interval.cancel(this.immediateInterval)
            this.stopLoadingProcess()
          } else {
            this.currentProgress = this.currentProgress + Math.floor((Math.random() * 20) + 20)
            this.bindedProgress(this.currentProgress)
          }
        }, 500)
      }
    }
  }

  angular.module('profitelo.services.pro-top-waiting-loader-service', [
    'pascalprecht.translate'
  ])
  .service('proTopWaitingLoaderService', TopWaitingLoaderService)
}

