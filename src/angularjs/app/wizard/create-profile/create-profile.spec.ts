import * as angular from 'angular';
import { WizardApi, WizardApiMock } from 'profitelo-api-ng/api/api';
import createProfilePageModule from './create-profile';
import { CreateProfileController } from './create-profile.controller';
import { StateService } from '@uirouter/angularjs';

describe('Testing Controller: CreateProfileController', () => {
  let CreateProfileController: CreateProfileController;
  let httpBackend: ng.IHttpBackendService;
  let $state: StateService;

  beforeEach(
    angular.mock.module(function($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', 'awesomeURL/');
      $provide.value('WizardApi', WizardApi);
      $provide.value('WizardApiMock', WizardApiMock);
    }),
  );

  beforeEach(() => {
    angular.mock.module(createProfilePageModule);

    inject(
      (
        $controller: ng.IControllerService,
        $httpBackend: ng.IHttpBackendService,
        WizardApi: WizardApi,
        WizardApiMock: WizardApiMock,
        $q: ng.IQService,
      ) => {
        $state = <any>{
          go: (_to: string): ng.IPromise<{}> => $q.resolve({}),
        };

        httpBackend = $httpBackend;
        WizardApiMock.getWizardProfileRoute(200, {
          isSummary: false,
          isCompany: false,
          isExpert: false,
          services: [],
        });
        CreateProfileController = $controller<CreateProfileController>('createProfileController', {
          $scope: {},
          WizardApi: WizardApi,
          previousState: '',
          $state: $state,
        });
      },
    );
    httpBackend.flush();
  });

  it('should exists', () => {
    expect(!!CreateProfileController).toBe(true);
  });

  it('should selectExpertPath', () => {
    spyOn($state, 'go');
    CreateProfileController.selectExpertPath();
    expect($state.go).toHaveBeenCalledWith('app.wizard.create-profile.expert');
  });

  it('should selectCompanyPath', () => {
    spyOn($state, 'go');
    CreateProfileController.selectCompanyPath();
    expect($state.go).toHaveBeenCalledWith('app.wizard.create-profile.company');
  });
});
