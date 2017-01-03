describe('Unit testing: profitelo.services.pro-top-waiting-loader-service >', () => {
  describe('for profitelo.services.pro-top-waiting-loader-service >', () => {

    let proTopWaitingLoaderService

    beforeEach(() => {
    angular.mock.module('profitelo.services.pro-top-waiting-loader-service')
    })

    beforeEach(inject(($injector) => {
      proTopWaitingLoaderService = $injector.get('proTopWaitingLoaderService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should run immediate function and callback', inject(($timeout, $interval) => {

      const cbs = {
        progressCallback: _ => _
      }

      spyOn($interval, 'cancel').and.callThrough()
      spyOn(cbs, 'progressCallback')

      proTopWaitingLoaderService.bindProgress(cbs.progressCallback)
      proTopWaitingLoaderService.immediate()
      $timeout.flush()
      $interval.flush(10000)

      expect($interval.cancel).toHaveBeenCalled()
      expect(cbs.progressCallback).toHaveBeenCalled()
    }))

  })
})
