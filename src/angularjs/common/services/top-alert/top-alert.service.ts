// tslint:disable:readonly-array
// tslint:disable:no-parameter-reassignment
// tslint:disable:strict-boolean-expressions
// tslint:disable:no-null-keyword
// tslint:disable:no-any
// tslint:disable:newline-before-return
import * as angular from 'angular';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';

export interface ITopAlertSettings {
  id?: number;
  icon?: string;
  message?: string;
  header?: string;
  type?: string;
  timeout?: number;
  visible?: boolean;
}

// tslint:disable:member-ordering
// tslint:disable:strict-type-predicates
export class TopAlertService {
  private alertArray: ITopAlertSettings[] = [];
  private defaultOptions = {};
  private alertsLimit = 2;

  public static $inject = ['$timeout'];

  constructor(private $timeout: ng.ITimeoutService) {}

  private setId = (): number => {
    const d = new Date();
    const randomNumberMultiplier = 1000;
    const n = d.getMilliseconds() + Math.floor(Math.random() * randomNumberMultiplier);
    return n;
  };

  public destroyAlert = (alertId: number): void => {
    if (this.alertsLimit < this.alertArray.length) {
      this.alertArray[this.alertsLimit].visible = true;
      this.timeoutDestroy(<any>this.alertArray[this.alertsLimit].timeout, <any>this.alertArray[this.alertsLimit].id);
    }
    _.remove(this.alertArray, alert => alert.id === alertId);
  };

  private timeoutDestroy = (timeout: number, id: number): void => {
    const timeoutMultiplier = 3000;
    if (typeof timeout !== 'undefined' && timeout !== null) {
      const realTimeout = timeout * timeoutMultiplier;
      this.$timeout(() => {
        this.destroyAlert(id);
      }, realTimeout);
    }
  };

  private pushAlert = (options: ITopAlertSettings): void => {
    if (this.alertArray.length < this.alertsLimit) {
      options.visible = true;
      this.timeoutDestroy(options.timeout || 0, options.id || 0);
    }
    this.alertArray.push(options);
  };

  public bindAlert = (alerts: any): void => {
    alerts(this.alertArray);
  };

  public success = (options: ITopAlertSettings): void => {
    options = options === undefined ? {} : options;
    this.defaultOptions = {
      id: this.setId(),
      icon: 'icon-success-24',
      message: '',
      type: 'success',
      timeout: null,
      visible: false,
    };
    this.pushAlert(angular.extend(this.defaultOptions, options));
  };

  public warning = (options: ITopAlertSettings): void => {
    options = options === undefined ? {} : options;
    this.defaultOptions = {
      id: this.setId(),
      icon: 'icon-warning-24',
      message: '',
      type: 'warning',
      timeout: null,
      visible: false,
    };
    this.pushAlert(angular.extend(this.defaultOptions, options));
  };

  public error = (options: ITopAlertSettings): void => {
    options = options === undefined ? {} : options;
    this.defaultOptions = {
      id: this.setId(),
      icon: 'icon-danger-24',
      message: '',
      type: 'error',
      timeout: null,
      visible: false,
    };
    this.pushAlert(angular.extend(this.defaultOptions, options));
  };

  public info = (options: ITopAlertSettings): void => {
    options = options === undefined ? {} : options;
    this.defaultOptions = {
      id: this.setId(),
      icon: 'icon-info-24',
      message: '',
      type: 'info',
      timeout: null,
      visible: false,
    };
    this.pushAlert(angular.extend(this.defaultOptions, options));
  };
}
