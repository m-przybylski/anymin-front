import {isPlatformForExpert} from '../../common/constants/platform-for-expert.constant'

export class WizardController implements ng.IController {
  public isFullscreen: boolean = true
  public isNavbar: boolean = true

  /* @ngInject */
  constructor(private $state: ng.ui.IStateService, private previousState: string) {
  }

  public onModalClose = (): void => {
    if (isPlatformForExpert) {
      this.$state.go('app.dashboard.settings.general')
    } else if (this.previousState) {
      this.$state.go(this.previousState)
    } else {
      this.$state.go('app.home')
    }
  }
}
