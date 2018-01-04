import * as angular from 'angular'
import {ActiveCallBarService} from './active-call-bar.service'
import {ExpertCallService} from '../call-services/expert-call.service'
import activeCallBarModule from './active-call-bar'

describe('Unit testing: profitelo.components.communicator.active-call-bar >', () => {
  describe('for active-call-bar service >', () => {

    const expertCallService = jasmine.createSpyObj<ExpertCallService>('expertCallService',
      ['onCallActive', 'onCallPull', 'onCallTaken', 'onCallEnd', 'pullCall'])

    const eventsService = {
      on: (_event: string, callback: () => void) => callback()
    }
    let activeCallBarService: ActiveCallBarService

    beforeEach(() => {
      angular.mock.module(activeCallBarModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('expertCallService', expertCallService)
      $provide.value('eventsService', eventsService)
    }))

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      activeCallBarService = $injector.get<ActiveCallBarService>('activeCallBarService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should call pull calling method from expert call service', () => {
      activeCallBarService.pullCall()
      expect(expertCallService.pullCall).toHaveBeenCalled()
    })
  })
})
