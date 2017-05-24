export class WizardController implements ng.IController {
  public isFullscreen: boolean = true
  public isNavbar: boolean = true

  /* @ngInject */
  constructor(private $state: ng.ui.IStateService, private previousState: string) {
  }

  public onModalClose = () => {
    if (this.previousState) {
      this.$state.go(this.previousState)
    } else {
      this.$state.go('app.home')
    }

  }
}
