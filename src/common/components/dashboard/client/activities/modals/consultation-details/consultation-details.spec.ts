import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {UrlService} from '../../../../../../services/url/url.service'
import {ViewsApi} from 'profitelo-api-ng/api/api'
import {IClientConsultationDetailsScope} from './consultation-details.controller'
describe('Testing Controller: clientConsultationDetails', () => {

  let clientConsultationDetails: any
  let scope: IClientConsultationDetailsScope
  const uibModalInstance = {
    dismiss: (): void => {

    },
    close: (): void => {

    }
  }

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
  }))

  beforeEach(() => {
    angular.mock.module('profitelo.components.dashboard.client.activities.modals.consultation-details')
    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$httpBackend_: ng.IHttpBackendService,
            _urlService_: UrlService, _ViewsApi_: ViewsApi) => {

      scope = <IClientConsultationDetailsScope>$rootScope.$new()
      scope.sueId = '123'

      clientConsultationDetails = $controller('clientConsultationDetails', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance,
        'httpBackend': _$httpBackend_,
        'urlService': _urlService_,
        'ViewsApi': _ViewsApi_
      })
    })
  })

  it('should exists', () => {
    return expect(!!clientConsultationDetails).toBe(true)
  })

  it('should uibModalInstance', () => {
    spyOn(uibModalInstance, 'dismiss')
    clientConsultationDetails.onModalClose()
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

})
