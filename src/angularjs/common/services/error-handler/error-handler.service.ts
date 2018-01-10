import {TopAlertService} from '../top-alert/top-alert.service'
import {TranslatorService} from '../translator/translator.service'
export class ErrorHandlerService {

    constructor(private topAlertService: TopAlertService,
              private $log: ng.ILogService,
              private translatorService: TranslatorService) {
  }

  public handleServerError = (error: any,
                              logMessage?: string,
                              errorMessageTranslationKey: string = 'INTERFACE.API_ERROR'): void => {
    this.topAlertService.error({
      message: this.translatorService.translate(errorMessageTranslationKey),
      timeout: 2
    })
    this.$log.error(logMessage, error)
  }

}
