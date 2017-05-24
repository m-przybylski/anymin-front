export class CreateProfileController implements ng.IController {

  /* @ngInject */
  constructor(private $state: ng.ui.IStateService) {
  }

  public selectExpertPath = () => {
    this.$state.go('app.wizard.create-profile.expert')
  }

  public selectCompanyPath = () => {
    this.$state.go('app.wizard.create-profile.company')
  }

}
