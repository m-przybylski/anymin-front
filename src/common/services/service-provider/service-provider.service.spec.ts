import * as angular from 'angular'
import {ServiceProviderService} from './service-provider.service'

describe('Unit testing: profitelo.services.service-provider-service >', function (): void {
  describe('for serviceProviderService service >', function (): void {

    let serviceProviderService: ServiceProviderService

    beforeEach(function (): void {
      angular.mock.module('profitelo.services.service-provider')
    })

    beforeEach(inject(function ($injector: ng.auto.IInjectorService): void {
      serviceProviderService = $injector.get<ServiceProviderService>('serviceProviderService')
    }))

  })
})
