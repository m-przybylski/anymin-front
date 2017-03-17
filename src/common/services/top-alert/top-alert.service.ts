import * as angular from 'angular'
import * as _ from 'lodash'

export interface ITopAlertSettings {
  id?: number
  icon?: string
  message?: string
  header?: string
  type?: string
  timeout?: number
  visible?: boolean
}

export class TopAlertService {

  private alertArray: Array<ITopAlertSettings> = []
  private defaultOptions = {}
  private alertsLimit = 2

  /* @ngInject */
  constructor(private $timeout: ng.ITimeoutService) {
  }

  private setId = (): number => {
    let d = new Date()
    let n = d.getMilliseconds() + Math.floor(Math.random() * 1000)
    return n
  }

  public destroyAlert = (alertId: number) => {
    if (this.alertsLimit < this.alertArray.length) {
      this.alertArray[this.alertsLimit].visible = true
      this.timeoutDestroy(<any>this.alertArray[this.alertsLimit].timeout, <any>this.alertArray[this.alertsLimit].id)
    }
    _.remove(this.alertArray, (alert) => {
      return alert.id === alertId
    })
  }

  private timeoutDestroy = (timeout: number, id: number) => {
    if (typeof timeout !== 'undefined' && timeout !== null) {
      let realTimeout = timeout * 1000
      this.$timeout(() => {
        this.destroyAlert(id)
      }, realTimeout)
    }
  }

  private pushAlert = (options: ITopAlertSettings) => {
    if (this.alertArray.length < this.alertsLimit) {
      options.visible = true
      this.timeoutDestroy(options.timeout || 0, options.id || 0)
    }
    this.alertArray.push(options)
  }

  public bindAlert = (alerts: any) => {
    alerts(this.alertArray)
  }

  public success = (options: ITopAlertSettings) => {
    options = options === undefined ? {} : options
    this.defaultOptions = {
      id: this.setId(),
      icon: 'icon-success-24',
      message: '',
      type: 'success',
      timeout: null,
      visible: false
    }
    this.pushAlert(angular.extend(this.defaultOptions, options))
  }

  public warning = (options: ITopAlertSettings) => {
    options = options === undefined ? {} : options
    this.defaultOptions = {
      id: this.setId(),
      icon: 'icon-warning-24',
      message: '',
      type: 'warning',
      timeout: null,
      visible: false
    }
    this.pushAlert(angular.extend(this.defaultOptions, options))
  }

  public error = (options: ITopAlertSettings) => {
    options = options === undefined ? {} : options
    this.defaultOptions = {
      id: this.setId(),
      icon: 'icon-danger-24',
      message: '',
      type: 'error',
      timeout: null,
      visible: false
    }
    this.pushAlert(angular.extend(this.defaultOptions, options))
  }

  public info = (options: ITopAlertSettings) => {
    options = options === undefined ? {} : options
    this.defaultOptions = {
      id: this.setId(),
      icon: 'icon-info-24',
      message: '',
      type: 'info',
      timeout: null,
      visible: false
    }
    this.pushAlert(angular.extend(this.defaultOptions, options))
  }
}
