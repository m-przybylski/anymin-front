import * as angular from 'angular'
import volumeMeterModule from './volume-meter'
import {VolumeMeterService} from './volume-meter.service'

describe('Unit testing: profitelo.services.volumeMeter >', () => {
  describe('for volumeMeter service >', () => {

    let volumeMeterService: VolumeMeterService

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('VolumeMeterService', VolumeMeterService)
    }))

    beforeEach(() => {
      angular.mock.module(volumeMeterModule)

      inject(($injector: ng.auto.IInjectorService) => {
        volumeMeterService = $injector.get<VolumeMeterService>('volumeMeter')
      })

    })

    it('should exist', () => {
      expect(true).toBeTruthy()
    })

    it('should have get function', () => {
      expect(volumeMeterService.createAudioMeter).toBeDefined()
    })
  })
})
