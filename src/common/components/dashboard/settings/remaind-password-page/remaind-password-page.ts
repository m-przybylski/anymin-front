namespace profitelo.components.dashboard.settings.remindPasswordPage {

  export class RemindPasswordPageController implements ng.IController {

    /* @ngInject */
    constructor() {

    }
  }

  class RemindPasswordPageComponent implements ng.IComponentOptions {

    controller: ng.Injectable<ng.IControllerConstructor> = RemindPasswordPageController
    templateUrl: string = 'components/dashboard/settings/remind-password-page/remind-password-page.tpl.html'
  }

  angular.module('profitelo.components.dashboard.settings.remind-password-page', [
    'pascalprecht.translate'
  ])
  .component('remind-password-page', new RemindPasswordPageComponent())
}
