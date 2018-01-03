import * as angular from 'angular'

import {UrlService} from '../../../../../../services/url/url.service'
import {ViewsApi} from 'profitelo-api-ng/api/api'
import {IExpertConsultationDetailsScope} from './consultation-details.controller'
describe('Testing Controller: expertConsultationDetails', () => {

  let expertConsultationDetails: any
  let scope: IExpertConsultationDetailsScope
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
    angular.mock.module('profitelo.components.dashboard.expert.activities.modals.consultation-details')
    inject(($rootScope: any, $controller: ng.IControllerService, _$httpBackend_: ng.IHttpBackendService,
            _urlService_: UrlService, _ViewsApi_: ViewsApi) => {

      scope = <IExpertConsultationDetailsScope>$rootScope.$new()
      scope.$parent.sueId = '123'

      expertConsultationDetails = $controller('expertConsultationDetails', {
        '$scope': scope,
        '$uibModalInstance': uibModalInstance,
        'httpBackend': _$httpBackend_,
        'urlService': _urlService_,
        'ViewsApi': _ViewsApi_
      })
    })
  })

  it('should exists', () => {
    return expect(!!expertConsultationDetails).toBe(true)
  })

  it('should uibModalInstance', () => {
    spyOn(uibModalInstance, 'dismiss')
    expertConsultationDetails.onModalClose()
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

})
