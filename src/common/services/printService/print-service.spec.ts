describe('Unit testing: profitelo.services.print-service >', () => {
  describe('for profitelo.services.print-service >', () => {

    let PrintService

    beforeEach(() => {
    angular.mock.module('profitelo.services.print-service')
    })

    beforeEach(inject(($injector) => {
      PrintService = $injector.get('PrintService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })
  })
})
