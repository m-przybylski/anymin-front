import { WizardApi } from 'profitelo-api-ng/api/api';
import { httpCodes } from '../../../common/classes/http-codes';
import { StateService } from '@uirouter/angularjs';

// tslint:disable:member-ordering
export class CreateProfileController implements ng.IController {

  public isLoading = true;
  public isSummary = false;

  public static $inject = ['$state', 'WizardApi', 'previousState'];

    constructor(private $state: StateService, WizardApi: WizardApi, previousState: string) {
    WizardApi.getWizardProfileRoute().then((wizardProfile) => {
      this.isSummary = wizardProfile.isSummary;
      this.isLoading = false;
      if (wizardProfile.isSummary && previousState !== 'app.wizard.summary') {
        this.$state.go('app.wizard.summary');
      }
    }, (error) => {
      if (error.status === httpCodes.notFound) {
        this.isLoading = false;
      }
    });
  }

  public selectExpertPath = (): void => {
    this.$state.go('app.wizard.create-profile.expert');
  }

  public selectCompanyPath = (): void => {
    this.$state.go('app.wizard.create-profile.company');
  }

}
