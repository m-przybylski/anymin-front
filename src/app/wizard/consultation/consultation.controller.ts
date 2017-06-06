import {CommonSettingsService} from '../../../common/services/common-settings/common-settings.service'
export class ConsultationController implements ng.IController {
  public consultationsMock: string[]
  public numberRegexp: RegExp
  public currency: string = 'PLN'

  /* @ngInject */

  constructor(CommonSettingsService: CommonSettingsService) {
    this.numberRegexp = CommonSettingsService.localSettings.numberPattern

    this.consultationsMock = [
      'Polski tag',
      'Angielski tag',
      'Rosyjski'
    ]
  }
}
