// tslint:disable:readonly-array
// tslint:disable:no-any
import { TopAlertService } from '../top-alert/top-alert.service';
import { TranslatorService } from '../translator/translator.service';
// tslint:disable:member-ordering
export class ErrorHandlerService {

  public static $inject = ['topAlertService', '$log', 'translatorService'];

    constructor(private topAlertService: TopAlertService,
              private $log: ng.ILogService,
              private translatorService: TranslatorService) {
  }

  public handleServerError = (error: any,
                              logMessage?: string,
                              errorMessageTranslationKey = 'INTERFACE.API_ERROR'): void => {
    this.topAlertService.error({
      message: this.translatorService.translate(errorMessageTranslationKey),
      timeout: 2
    });
    this.$log.error(logMessage, error);
  }

}
