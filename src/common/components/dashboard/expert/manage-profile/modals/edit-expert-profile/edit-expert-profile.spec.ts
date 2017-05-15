import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import manageProfileEditProfileModule from './edit-expert-profile'
import {EditExpertProfileController, IEditExpertProfileScope} from './edit-expert-profile.controller'
describe('Testing Controller: editExpertProfileController', () => {

  let editExpertProfileController: EditExpertProfileController
  let scope: IEditExpertProfileScope
  const uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(() => {
    angular.mock.module(manageProfileEditProfileModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
  }))

  beforeEach(() => {
    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {

      scope = <IEditExpertProfileScope>$rootScope.$new()

      editExpertProfileController = $controller(EditExpertProfileController, {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance
      })
    })
  })

  it('should exists', () => {
    return expect(!!editExpertProfileController).toBe(true)
  })

  it('should uibModalInstance', () => {
    spyOn(uibModalInstance, 'dismiss')
    editExpertProfileController.onModalClose()
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

})
