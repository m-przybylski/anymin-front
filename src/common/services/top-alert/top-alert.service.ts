namespace profitelo.services.topAlert {

  export interface ITopAlertSettings {
    id?: number
    icon?: string
    message?: string
    type?: string
    timeout?: number
    visible?: boolean
  }

  export interface ITopAlertService {
    bindAlert(alerts: (alerts: Array<ITopAlertSettings>) => void): void
    success(options: ITopAlertSettings): void
    warning(options: ITopAlertSettings): void
    error(options: ITopAlertSettings): void
    info(options: ITopAlertSettings): void
    destroyAlert(alertId: number): void
  }

  class TopAlertService implements ITopAlertService {

    private alertArray: Array<ITopAlertSettings> = []
    private defaultOptions = {}
    private alertsLimit = 2

    constructor(private $timeout: ng.ITimeoutService, private lodash: _.LoDashStatic) {
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
      this.lodash.remove(this.alertArray, (alert) => {
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

  angular.module('profitelo.services.top-alert', [
    'ngLodash',
    'pascalprecht.translate'
  ])
  .service('topAlertService', TopAlertService)
}
