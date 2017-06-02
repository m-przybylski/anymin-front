import * as angular from 'angular'
import {ServiceProviderService} from './service-provider.service'

describe('Unit testing: profitelo.services.service-provider-service >', function () {
  describe('for serviceProviderService service >', function () {

    let serviceProviderService: ServiceProviderService

    beforeEach(function () {
      angular.mock.module('profitelo.services.service-provider')
    })

    beforeEach(inject(function ($injector: ng.auto.IInjectorService) {
      serviceProviderService = $injector.get<ServiceProviderService>('serviceProviderService')
    }))



  })
})
