describe('Unit tests: ChoosePathController >', () => {
  describe('Testing Controller: ChoosePathController', () => {

    var ChoosePathController

    beforeEach(() => {
      module('profitelo.controller.dashboard.service-provider.choose-path')
      inject(($rootScope, $controller) => {
        ChoosePathController = $controller('ChoosePathController', {
        })
      })
    })

    it('should exists', () => {
      return expect(!!ChoosePathController).toBe(true)
    })

  })
})
