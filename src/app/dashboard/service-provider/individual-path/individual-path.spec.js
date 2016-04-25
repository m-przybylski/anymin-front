describe('Unit tests: IndividualPathController >', () => {
  describe('Testing Controller: IndividualPathController', () => {

    var IndividualPathController

    beforeEach(() => {
      module('profitelo.controller.dashboard.service-provider.individual-path')
      inject(($rootScope, $controller) => {
        IndividualPathController = $controller('IndividualPathController', {
        })
      })
    })

    it('should exists', () => {
      return expect(!!IndividualPathController).toBe(true)
    })

  })
})
