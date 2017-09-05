import * as angular from 'angular'
import {HelpdeskService} from './helpdesk.service'
import zendeskApiModule from './helpdesk'

describe('Unit testing: profitelo.services.helpdeskService >', () => {
  describe('for profitelo.services.helpdeskService >', () => {

    let helpdeskService: HelpdeskService
    beforeEach(() => {
      angular.mock.module(zendeskApiModule)
    })

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      helpdeskService = $injector.get<HelpdeskService>('helpdeskService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })
  })
})
