import {CommonSettingsService} from '../../../../../services/common-settings/common-settings.service'

export interface IRtcDetectorBlockedModalControllerScope extends ng.IScope {
}

interface ITranslateHref {
  hrefUrl: string
}

export class RtcDetectorBlockedModalController implements ng.IController {
  public rtcBlockedTranslation: string = 'COMMUNICATOR.MODALS.RTC.BLOCKED.DESCRIPTION'
  public rtcBlockedTranslationHref: ITranslateHref

  static $inject = ['$uibModalInstance', 'CommonSettingsService'];

    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              CommonSettingsService: CommonSettingsService) {
    this.rtcBlockedTranslationHref = {
      hrefUrl: CommonSettingsService.links.zendeskAllowMediaUrl
    }
  }

  public onModalClose = (): void =>
    this.$uibModalInstance.dismiss('cancel')
}
