// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
import { Config } from '../../../config';
import { StateService } from '@uirouter/angularjs';

// tslint:disable:member-ordering
export class WizardController implements ng.IController {
  public isFullscreen = true;
  public isNavbar = true;

  public static $inject = ['$state', 'previousState'];

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
