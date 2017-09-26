import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import consultationFormModalModule from './consultation-form-modal'
import {ConsultationFormModalController, IConsultationFormModalScope} from './consultation-form-modal.controller'
import {ServiceApi} from 'profitelo-api-ng/api/api';
import {Tag} from 'profitelo-api-ng/model/models';
import {ErrorHandlerService} from '../../../../../../services/error-handler/error-handler.service'
describe('Testing Controller: ConsultationFormModalController', () => {

  let consultationFormModalController: ConsultationFormModalController
  let scope: IConsultationFormModalScope
  let ServiceApi: ServiceApi
  let errorHandler: ErrorHandlerService

  const uibModalInstance = {
    dismiss: (): void => {

    },
    close: (): void => {

    }
  }
  const userService = {
    getUser: (): void => {
    }
  }

  beforeEach(() => {
    angular.mock.module(consultationFormModalModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
    $provide.value('userService', userService)
    $provide.value('normalizeTranslationKeyFilter', (x: string) => x)
  }))

  beforeEach(() => {
    inject(($rootScope: IRootScopeService,
            $controller: ng.IControllerService,
            _ServiceApi_: ServiceApi) => {

      ServiceApi = _ServiceApi_

      scope = <IConsultationFormModalScope>$rootScope.$new()

      consultationFormModalController = $controller(ConsultationFormModalController, {
        $scope: scope,
        $uibModalInstance: uibModalInstance,
        userService: userService,
        ServiceApi,
        errorHandler
      })
    })
  })

  it('should exists', () => expect(!!consultationFormModalController).toBe(true))

  it('should not save consultation', () => {
    consultationFormModalController.consultationName = 'a'
    consultationFormModalController.saveConsultation()
    expect(consultationFormModalController.isSubmitted).toBe(true)
  })

  it('should save new consultation', inject(($q: ng.IQService) => {
    spyOn(ServiceApi, 'postServiceRoute').and.callFake(() => $q.resolve({}))
    consultationFormModalController.consultationName = 'someName'
    consultationFormModalController.consultationTags = ['tag']
    consultationFormModalController.consultationLanguage = {name: 'pl', value: 'pl'}
    consultationFormModalController.consultationDescription = 'someDescription someDescription someDescription someDescription'
    consultationFormModalController.consultationNewInvitations = ['employee@wp.pl']
    consultationFormModalController.consultationPrice = '1.00'
    consultationFormModalController.saveConsultation()
    expect(ServiceApi.postServiceRoute).toHaveBeenCalled()
    expect(consultationFormModalController.isSubmitted).toBe(false)
  }))

  it('should edit existing consultation', inject(($q: ng.IQService) => {
    spyOn(ServiceApi, 'postServiceRoute').and.callFake(() => $q.resolve({}))
    consultationFormModalController.consultationName = 'someName'
    consultationFormModalController.consultationTags = ['tag']
    consultationFormModalController.consultationLanguage = {name: 'pl', value: 'pl'}
    consultationFormModalController.consultationDescription = 'someDescription someDescription someDescription someDescription'
    consultationFormModalController.consultationNewInvitations = ['48555555555']
    consultationFormModalController.consultationPrice = '1.00'
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
        createdAt: 123
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
    consultationFormModalController.saveConsultation()
    expect(ServiceApi.postServiceRoute).toHaveBeenCalled()
    expect(consultationFormModalController.isSubmitted).toBe(false)
  }))

  it('should consultation price be invalid', () => {
    consultationFormModalController.consultationPrice = ''
    expect(consultationFormModalController.isPriceValid()).toBe(false)
  })

  it('should price not pass RegExpPrice test', () => {
    consultationFormModalController.onPriceChange('123,aa')
    expect(consultationFormModalController.isRegExpPriceInputValid).toBe(false)
  })

})
