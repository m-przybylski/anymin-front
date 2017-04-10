import * as angular from 'angular'
import {NavigatorService} from './navigator.service'
import navigatorModule from './navigator'

describe('Unit testing: profitelo.services.eventsService >', () => {
  describe('for profitelo.services.eventService >', () => {

    let navigatorService: NavigatorService
    let rootScope: ng.IRootScopeService
    let q: ng.IQService

    beforeEach(() => {
      angular.mock.module(navigatorModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('$window', window)
    }))

    beforeEach(inject(($injector: ng.auto.IInjectorService, $rootScope: angular.IRootScopeService,
                       $q: ng.IQService) => {
      navigatorService = $injector.get<NavigatorService>('navigatorService')
      rootScope = $rootScope
      q = $q
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

  })
})
