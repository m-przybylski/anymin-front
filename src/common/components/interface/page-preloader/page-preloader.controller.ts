import {PromiseService} from '../../../services/promise/promise.service'
export class PagePreloaderComponentController implements ng.IController {

  public isLoading: boolean = false
  public isError: boolean = false
  private static readonly minimalPreloadingTime: number = 500
  private static readonly minimalTimeToStartPreloading: number = 500
  private isStateLoaded: boolean = false
  private stateChangeStart: () => void
  private stateChangeSuccess: () => void
  private stateChangeError: () => void
  private toStateName: string
  private toStateParams: { [key: string]: string }

  /* @ngInject */
  constructor(private $rootScope: ng.IRootScopeService,
              private $timeout: ng.ITimeoutService,
              private promiseService: PromiseService,
              private $log: ng.ILogService,
              private $state: ng.ui.IStateService) {
  }

  $onInit = (): void => {
    this.stateChangeStart =
      this.$rootScope.$on('$stateChangeStart', (_event, toState, _toParams, _fromState, _fromParams) => {
        if (toState.resolve) {
          this.isStateLoaded = false
          this.setIsLoading()
          this.isError = false
        }
      })

    this.stateChangeSuccess =
      this.$rootScope.$on('$stateChangeSuccess', (_event, toState, _toParams, _fromState, _fromParams) => {
        if (toState.resolve) {
          this.isStateLoaded = true
          this.isLoading = false
        }
      })

    this.stateChangeError =
      this.$rootScope.$on('$stateChangeError', (_event, toState, toParams, _fromState, _fromParams, error) => {
        if (toState.resolve) {
          this.toStateName = toState.name
          this.toStateParams = toParams

          this.isStateLoaded = true
          this.isLoading = false
          this.isError = true
          this.$log.error(error)
        }
      })
  }

  $onDestroy = (): void => {
    this.stateChangeStart()
    this.stateChangeSuccess()
    this.stateChangeError()
  }

  public onStateReload = (): void => {
    this.$state.go(this.toStateName, this.toStateParams)
  }

  private setIsLoading = (): void => {
    if (this.isError) this.isLoading = true
    else this.promiseService.setMinimalDelay(
      this.$timeout(() => {
        this.isLoading = !this.isStateLoaded
      }, PagePreloaderComponentController.minimalTimeToStartPreloading),
      PagePreloaderComponentController.minimalPreloadingTime)
  }

}
