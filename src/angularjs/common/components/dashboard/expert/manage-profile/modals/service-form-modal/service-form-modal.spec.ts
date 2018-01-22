import * as angular from 'angular'

import serviceFormModalModule from './service-form-modal'
import {ServiceFormModalController, IServiceFormModalScope} from './service-form-modal.controller'
import {ServiceApi} from 'profitelo-api-ng/api/api';
import {Tag} from 'profitelo-api-ng/model/models';
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

  it('should edit existing consultation', inject(($q: ng.IQService) => {
    spyOn(ServiceApi, 'postServiceRoute').and.callFake(() => $q.resolve({}))
    serviceFormModalController.consultationName = 'someName'
    serviceFormModalController.consultationTags = ['tag', 'tag2', 'tag3']
    serviceFormModalController.consultationLanguage = {name: 'pl', value: 'pl'}
    serviceFormModalController.consultationDescription = 'someDescription someDescription someDescription someDescription'
    serviceFormModalController.consultationNewInvitations = ['48555555555']
    serviceFormModalController.consultationPrice = '1.00'
    scope.serviceDetails = {
      service: {
        id: 'id',
        ownerId: 'id',
        name: 'name',
        description: 'description',
        price: {
          amount: 123,
          currency: 'PLN'
        },
        rating: 123,
        usageCounter: 123,
        usageDurationInSeconds: 123,
        language: 'pl',
        isSuspended: false,
        createdAt: new Date(123)
      },
      ownerProfile: {
        id: 'id',
        isActive: false
      },
      tags: [{
        name: 'tag',
        id: 'id',
        status: Tag.StatusEnum.NEW,
        persisted: false
      }]
    }
    serviceFormModalController.saveConsultation()
    expect(ServiceApi.postServiceRoute).toHaveBeenCalled()
    expect(serviceFormModalController.isSubmitted).toBe(false)
  }))

  it('should consultation price be invalid', () => {
    const price: number = 133
    serviceFormModalController.onPriceChange(price)
    expect(serviceFormModalController.isPriceValid()).toBe(false)
  })

  it('should consultation price be valid', () => {
    const price: number = 13
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
