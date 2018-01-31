import { IRootScopeService } from '../root-scope/root-scope.service';

// tslint:disable:member-ordering
export class TopWaitingLoaderService {

  private bindedProgress: (progress: number) => void;
  private immediateInProgress: boolean;
  private currentProgress: number;
  private immediateInterval: ng.IPromise<any>;
  private maxProgressValue: number = 100;

  public static $inject = ['$rootScope', '$timeout', '$interval'];

    constructor($rootScope: IRootScopeService, private $timeout: ng.ITimeoutService,
              private $interval: ng.IIntervalService) {

    this.immediateInProgress = false;
    this.currentProgress = 0;

    $rootScope.$on('$stateChangeSuccess', () => {
      $timeout(this.stopLoadingProcess);
    });
  }

  public bindProgress = (progress: (progress: number) => void): void => {
    this.currentProgress = 0;
    this.bindedProgress = progress;
    this.bindedProgress(this.currentProgress);
  }

  public stopLoader = (): void => {
    this.$timeout(this.stopLoadingProcess);
  }

  public immediate = (): void => {
    this.$timeout(this.startImmediateLoading);
  }

  private stopLoadingProcess = (): void => {
    this.$interval.cancel(this.immediateInterval);
    this.immediateInProgress = false;
    this.currentProgress = this.maxProgressValue;
    this.bindedProgress(this.currentProgress);
    this.currentProgress = 0;
    this.bindedProgress(this.currentProgress);
  }

  private startImmediateLoading = (): void => {
    const intervalDelay: number = 500;
    const minRandomValue: number = 20;
    if (!this.immediateInProgress) {
      this.immediateInProgress = true;
      this.immediateInterval = this.$interval(() => {
        if (this.currentProgress > this.maxProgressValue) {
          this.$interval.cancel(this.immediateInterval);
          this.stopLoadingProcess();
        } else {
          this.currentProgress = this.currentProgress + Math.floor((Math.random() * minRandomValue) + minRandomValue);
          this.bindedProgress(this.currentProgress);
        }
      }, intervalDelay);
    }
  }
}
