import * as angular from 'angular'

import serviceFormModalModule from './service-form-modal'
import {ServiceFormModalController, IServiceFormModalScope} from './service-form-modal.controller'
import {ServiceApi} from 'profitelo-api-ng/api/api';
import {ErrorHandlerService} from '../../../../../../services/error-handler/error-handler.service'
describe('Testing Controller: ServiceFormModalController', () => {

  let serviceFormModalController: ServiceFormModalController
  let scope: IServiceFormModalScope
  let ServiceApi: ServiceApi
  let errorHandler: ErrorHandlerService

  const uibModalInstance = {
    dismiss: (): void => {

    },
    cancel: (): void => {

    }
  }
  const userService = {
    getUser: (): void => {
    }
  }

  beforeEach(() => {
    angular.mock.module(serviceFormModalModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
    $provide.value('userService', userService)
    $provide.value('normalizeTranslationKeyFilter', (x: string) => x)
  }))

  beforeEach(() => {
    inject(($rootScope: any,
            $controller: ng.IControllerService,
            _ServiceApi_: ServiceApi) => {

      ServiceApi = _ServiceApi_

      scope = <IServiceFormModalScope>$rootScope.$new()

      serviceFormModalController = $controller(ServiceFormModalController, {
        $scope: scope,
        $uibModalInstance: uibModalInstance,
        userService,
        ServiceApi,
        errorHandler
      })
    })
  })

  it('should exists', () => expect(!!serviceFormModalController).toBe(true))

  it('should not save consultation', () => {
    serviceFormModalController.consultationName = 'a'
    serviceFormModalController.saveConsultation()
    expect(serviceFormModalController.isSubmitted).toBe(true)
  })

  it('should save new consultation', inject(($q: ng.IQService) => {
    spyOn(ServiceApi, 'postServiceRoute').and.callFake(() => $q.resolve({}))
    serviceFormModalController.consultationName = 'someName'
    serviceFormModalController.consultationTags = ['tag', 'tag2', 'tag3']
    serviceFormModalController.consultationLanguage = {name: 'pl', value: 'pl'}
    serviceFormModalController.consultationDescription = 'someDescription someDescription someDescription someDescription'
    serviceFormModalController.consultationNewInvitations = ['employee@wp.pl']
    serviceFormModalController.consultationPrice = '1.00'
    serviceFormModalController.saveConsultation()
    expect(ServiceApi.postServiceRoute).toHaveBeenCalled()
    expect(serviceFormModalController.isSubmitted).toBe(false)
  }))

  it('should consultation price be invalid', () => {
    const price = 133
    serviceFormModalController.onPriceChange(price)
    expect(serviceFormModalController.isPriceValid()).toBe(false)
  })

  it('should consultation price be valid', () => {
    const price = 13
    serviceFormModalController.onPriceChange(price)
    expect(serviceFormModalController.isPriceValid()).toBe(true)
  })

  it('should price not pass RegExpPrice test', () => {
    serviceFormModalController.isRegExpPriceValid(false)
    expect(serviceFormModalController.isRegExpPriceInputValid).toBe(false)
  })

  it('should close modal', () => {
    spyOn(uibModalInstance, 'dismiss')
    serviceFormModalController.onModalClose()
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

})
