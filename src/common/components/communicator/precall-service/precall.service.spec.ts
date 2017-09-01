import * as angular from 'angular'
import RtcDetectorModule from '../../../services/rtc-detector/rtc-detector'

describe('Unit testing: profitelo.common.components.precallService >', () => {
  describe('for precallService >', () => {

    const modalsService = {
      createPrecallModal: (): void => {
      }
    }

    beforeEach(() => {
      angular.mock.module(RtcDetectorModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
      $provide.value('modalsService', modalsService)
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })
  })
})
