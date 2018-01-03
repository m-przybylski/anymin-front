import {ActiveCallBarService} from './active-call-bar.service'

export class ActiveCallBarComponentController implements ng.IController {

  public isCallPendingOnOtherDevice: boolean = false

  /* @ngInject */
  constructor(private activeCallBarService: ActiveCallBarService) {
    activeCallBarService.onHideCallBar(this.hideCallBar)
    activeCallBarService.onShowCallBar(this.showCallBar)
  }

  private hideCallBar = (): void => {
    this.isCallPendingOnOtherDevice = false
  }

  private showCallBar = (): void => {
    this.isCallPendingOnOtherDevice = true
  }

  public pullCall = (): void => {
    this.activeCallBarService.pullCall()
  }
}
