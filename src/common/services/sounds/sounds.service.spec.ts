interface Window {
  Audio: any;
}

declare var window: Window;

describe('Unit testing: profitelo.services.sounds >', () => {
  describe('for profitelo.services.sounds >', () => {

    const audioMock = {
      addEventListener: _ => _,
      play: _ => _,
      pause: _ => _
    }
    let soundsService
    let audioOriginal

    beforeEach(() => {
    angular.mock.module('profitelo.services.sounds')
    angular.mock.module('ngLodash')
    })

    beforeEach(() => {
      audioOriginal = window.Audio
      window.Audio = () => audioMock
    })

    afterEach(() => {
      window.Audio = audioOriginal
    })

    beforeEach(inject(($injector) => {
      soundsService = $injector.get('soundsService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should play new message sound', () => {
      spyOn(audioMock, 'play')
      soundsService.playMessageNew()
      expect(audioMock.play).toHaveBeenCalled()
    })

    it('should playCallRejected sound', () => {
      spyOn(audioMock, 'play')
      soundsService.playCallRejected()
      expect(audioMock.play).toHaveBeenCalled()
    })

    it('should playCallEnded sound', () => {
      spyOn(audioMock, 'play')
      soundsService.playCallEnded()
      expect(audioMock.play).toHaveBeenCalled()
    })

    it('should play and stop callConnectingSound', () => {
      spyOn(audioMock, 'play')
      spyOn(audioMock, 'pause')
      soundsService.callConnectingSound().play()
      soundsService.callConnectingSound().play()
      soundsService.callConnectingSound().stop()
      soundsService.callConnectingSound().stop()
      expect(audioMock.play).toHaveBeenCalled()
      expect(audioMock.pause).toHaveBeenCalled()
    })

    it('should play and stop callIncomingSound', () => {
      spyOn(audioMock, 'play')
      spyOn(audioMock, 'pause')
      soundsService.callIncomingSound().play()
      soundsService.callIncomingSound().play()
      soundsService.callIncomingSound().stop()
      soundsService.callIncomingSound().stop()
      expect(audioMock.play).toHaveBeenCalled()
      expect(audioMock.pause).toHaveBeenCalled()
    })
  })
})
