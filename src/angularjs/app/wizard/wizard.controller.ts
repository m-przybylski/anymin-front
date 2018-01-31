import { Config } from '../../../config';
import { StateService } from '@uirouter/angularjs';

export class WizardController implements ng.IController {
  public isFullscreen: boolean = true;
  public isNavbar: boolean = true;

  static $inject = ['$state', 'previousState'];

    constructor(private $state: StateService, private previousState: string) {
  }

  public onModalClose = (): void => {
    if (Config.isPlatformForExpert) {
      this.$state.go('app.dashboard.settings.general');
    } else if (this.previousState) {
      this.$state.go(this.previousState);
    } else {
      this.$state.go('app.home');
    }
  }
}
