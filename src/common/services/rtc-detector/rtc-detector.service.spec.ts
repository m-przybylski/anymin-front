import * as angular from 'angular'
import {RtcDetectorService} from './rtc-detector.service'
import RtcDetectorModule from './rtc-detector'
import {MediaStreamConstraintsWrapper} from '../../classes/media-stream-constraints-wrapper'

describe('Unit testing: profitelo.services.callbacks >', () => {
  describe('for profitelo.services.callbacks >', () => {

    let rtcDetectorService: RtcDetectorService
    let getMedia: ng.IPromise<MediaStream>
    
    beforeEach(() => {
      angular.mock.module(RtcDetectorModule)
    })

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      rtcDetectorService = $injector.get<RtcDetectorService>('rtcDetectorService')
      getMedia = rtcDetectorService.getMedia(MediaStreamConstraintsWrapper.getDefault())
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })
  })
})
