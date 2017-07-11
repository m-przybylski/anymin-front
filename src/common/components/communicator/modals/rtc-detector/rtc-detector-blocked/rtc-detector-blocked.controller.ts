export interface IRtcDetectorBlockedModalControllerScope extends ng.IScope {
}

interface ITranslateHref {
  hrefUrl: string
}

export class RtcDetectorBlockedModalController implements ng.IController {
  public rtcBlockedTranslation: string = ''
  public rtcBlockedTranslationHref: ITranslateHref

  /* @ngInject */
  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {
    this.rtcBlockedTranslationHref = {
      hrefUrl: '/dashboard/settings/payouts'
    }
    this.rtcBlockedTranslation = 'COMMUNICATOR.MODALS.RTC.BLOCKED.DESCRIPTION'
  }

  public onModalClose = (): void =>
    this.$uibModalInstance.dismiss('cancel')

}
