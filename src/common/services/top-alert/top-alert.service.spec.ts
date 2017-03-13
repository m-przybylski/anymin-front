import * as angular from "angular"
import {TopAlertService} from "./top-alert.service"
namespace profitelo.services.topAlert {

  describe('Unit testing: profitelo.services.pro-top-alert-service>', () => {
    describe('for topAlertService service >', () => {

      let topAlertService: TopAlertService

      beforeEach(() => {
        angular.mock.module('profitelo.services.top-alert')

        inject(($injector: ng.auto.IInjectorService) => {
          topAlertService = $injector.get<TopAlertService>('topAlertService')
        })
      })

      it('should have a dummy test', () => {
        expect(true).toBeTruthy()
      })
    })
  })
}
