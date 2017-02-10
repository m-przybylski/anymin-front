namespace profitelo.services.print {
describe('Unit testing: profitelo.services.print >', () => {
  describe('for profitelo.services.print >', () => {

    let printService

    beforeEach(() => {
    angular.mock.module('profitelo.services.print')
    })

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      printService = $injector.get('printService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })
  })
})
}
