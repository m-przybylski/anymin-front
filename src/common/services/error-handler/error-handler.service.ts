import {TopAlertService} from '../top-alert/top-alert.service'
export class ErrorHandlerService {

  /* @ngInject */
  constructor(private topAlertService: TopAlertService,
              private $log: ng.ILogService,
              private $filter: ng.IFilterService) {
  }

  public handleServerError = (error: any,
                              logMessage?: string,
                              errorMessageTranslationKey: string = 'INTERFACE.API_ERROR'): void => {
    this.topAlertService.error({
      message: this.$filter('translate')(errorMessageTranslationKey),
      timeout: 2
    })
    this.$log.error(logMessage, error)
  }

}
