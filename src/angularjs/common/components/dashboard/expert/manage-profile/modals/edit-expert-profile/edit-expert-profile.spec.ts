import * as angular from 'angular';

import manageProfileEditProfileModule from './edit-expert-profile';
import { EditExpertProfileController, IEditExpertProfileScope } from './edit-expert-profile.controller';
import { ProfileApi } from 'profitelo-api-ng/api/api';

describe('Testing Controller: editExpertProfileController', () => {
  let editExpertProfileController: EditExpertProfileController;
  let scope: IEditExpertProfileScope;
  let ProfileApi: ProfileApi;
  const uibModalInstance = {
    dismiss: (): void => {},
    close: (): void => {},
  };

  beforeEach(() => {
    angular.mock.module(manageProfileEditProfileModule);
  });

  beforeEach(
    angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL');
      $provide.value('topAlertService', {});
    }),
  );

  beforeEach(() => {
    inject(($rootScope: any, $controller: ng.IControllerService, _ProfileApi_: ProfileApi) => {
      ProfileApi = _ProfileApi_;

      scope = <IEditExpertProfileScope>$rootScope.$new();

      editExpertProfileController = $controller(EditExpertProfileController, {
        $scope: scope,
        $uibModalInstance: uibModalInstance,
        ProfileApi: ProfileApi,
      });
    });
  });

  it('should exists', () => {
    expect(!!editExpertProfileController).toBe(true);
  });

  it('should uibModalInstance', () => {
    spyOn(uibModalInstance, 'dismiss');
    editExpertProfileController.onModalClose();
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel');
  });

  it('should not save profile ', () => {
    editExpertProfileController.profileName = 'a';
    editExpertProfileController.saveChanges();
    expect(editExpertProfileController.isSubmitted).toBe(true);
  });

  it('should save expert profile', inject(($q: ng.IQService) => {
    spyOn(ProfileApi, 'putExpertProfileRoute').and.callFake(() => $q.resolve({}));
    editExpertProfileController.profileName = 'SomeName';
    editExpertProfileController.profileAvatarToken = 'someToken';
    editExpertProfileController.profileDescription = 'someDescription someDescription someDescription someDescription';
    scope.profile = {
      id: 'id',
      name: 'name',
      avatar: 'avatar',
      description: 'someDescription someDescription someDescription someDescription',
      documents: [
        {
          token: 'token',
          previews: ['preview'],
          contentType: 'image/png',
        },
      ],
    };
    const updatedProfile = {
      name: 'SomeName',
      avatar: 'someToken',
      description: 'someDescription someDescription someDescription someDescription',
      files: [],
      links: [],
    };
    const status = true;
    editExpertProfileController.onFileUploadEnd(status);
    editExpertProfileController.saveChanges();
    expect(editExpertProfileController.isSubmitted).toBe(false);
    expect(ProfileApi.putExpertProfileRoute).toHaveBeenCalledWith(updatedProfile);
  }));

  it('should save organization profile', inject(($q: ng.IQService) => {
    spyOn(ProfileApi, 'putOrganizationProfileRoute').and.callFake(() => $q.resolve({}));
    editExpertProfileController.profileName = 'SomeName';
    editExpertProfileController.profileAvatarToken = 'someToken';
    editExpertProfileController.profileDescription = 'someDescription someDescription someDescription someDescription';
    scope.profile = {
      id: 'id',
      name: 'name',
      logo: 'avatar',
      description: 'someDescription someDescription someDescription someDescription',
      documents: [
        {
          token: 'token',
          previews: ['preview'],
          contentType: 'image/png',
        },
      ],
    };
    const updatedProfile = {
      name: 'SomeName',
      logo: 'someToken',
      description: 'someDescription someDescription someDescription someDescription',
      files: [],
      links: [],
    };
    const status = true;
    editExpertProfileController.onFileUploadEnd(status);
    editExpertProfileController.saveChanges();
    expect(editExpertProfileController.isSubmitted).toBe(false);
    expect(ProfileApi.putOrganizationProfileRoute).toHaveBeenCalledWith(updatedProfile);
  }));

  it('should check is profile name valid', () => {
    editExpertProfileController.profileName = 'Franek';
    editExpertProfileController.isNameValid();
    expect(editExpertProfileController.isNameValid()).toBe(true);
  });

  it('should check is profile name valid', () => {
    editExpertProfileController.profileName = 'Franek';
    editExpertProfileController.isNameValid();
    expect(editExpertProfileController.isNameValid()).toBe(true);
  });
});
