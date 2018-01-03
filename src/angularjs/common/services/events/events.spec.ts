import * as angular from 'angular'
import {EventsService} from './events.service'
import eventsModule from './events'

describe('Unit testing: profitelo.services.eventsService >', () => {
  describe('for profitelo.services.eventService >', () => {

    let eventsService: EventsService
    let rootScope: ng.IRootScopeService
    beforeEach(() => {
      angular.mock.module(eventsModule)
    })

    beforeEach(inject(($injector: ng.auto.IInjectorService, $rootScope: angular.IRootScopeService) => {
      eventsService = $injector.get<EventsService>('eventsService')
      rootScope = $rootScope
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should emit event and call callback', () => {
      const spy = jasmine.createSpy('spy')
      eventsService.on('login', spy)
      eventsService.emit('login')
      rootScope.$digest()
      expect(spy).toHaveBeenCalled()
    })

    it('should destroy event on scope destroy', () => {
      const spy = jasmine.createSpy('spy')
      const localScope = rootScope.$new()
      eventsService.on('login', spy, localScope)
      localScope.$destroy()
      eventsService.emit('login')
      rootScope.$digest()
      expect(spy).not.toHaveBeenCalled()
    })

  })
})
