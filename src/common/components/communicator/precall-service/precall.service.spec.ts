import * as angular from 'angular'
import RtcDetectorModule from '../../../services/rtc-detector/rtc-detector'
import {PrecallService} from './precall.service'

describe('Unit testing: profitelo.common.components.precallService >', () => {
  describe('for precallService >', () => {

    const modalsService = {
      createPrecallModal: (): void => {
      }
    }

    let precallService: PrecallService

    beforeEach(() => {
      angular.mock.module(RtcDetectorModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService, $injector: ng.auto.IInjectorService) => {
      $provide.value('apiUrl', 'awesomeURL')
      $provide.value('modalsService', modalsService)
      precallService = $injector.get<PrecallService>('precallService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })
  })
})
