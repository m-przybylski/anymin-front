describe('Unit testing: profitelo.services.pro-top-waiting-loader-service >', () => {
  describe('for profitelo.services.pro-top-waiting-loader-service >', () => {

    let proTopWaitingLoaderService

    beforeEach(() => {
      module('profitelo.services.pro-top-waiting-loader-service')
    })

    beforeEach(inject(($injector) => {
      proTopWaitingLoaderService = $injector.get('proTopWaitingLoaderService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })
  })
})
