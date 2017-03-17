import {IConsultationDetailsScope, IConsultationDetailsParentScope} from './consultation-details'
import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {UrlService} from '../../../../../../services/url/url.service'
import {ViewsApi} from 'profitelo-api-ng/api/api'
describe('Testing Controller: clientConsultationDetails', () => {

  let clientConsultationDetails: any
  let scope: IConsultationDetailsScope
  const uibModalInstance = {
    dismiss: () => {

    },
    close: () => {

    }
  }

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
  }))

  beforeEach(() => {
    angular.mock.module('profitelo.components.dashboard.client.activities.modals.consultation-details')
    inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _$httpBackend_: ng.IHttpBackendService,
            _urlService_: UrlService, _ViewsApi_: ViewsApi) => {

      scope = <IConsultationDetailsScope>$rootScope.$new()
      scope.$parent = <IConsultationDetailsParentScope>$rootScope.$new()
      scope.$parent.sueId = '123'

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
    scope.onModalClose()
    expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

})
