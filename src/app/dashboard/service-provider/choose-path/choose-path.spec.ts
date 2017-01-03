describe('Unit tests: ChoosePathController >', () => {
  describe('Testing Controller: ChoosePathController', () => {

    var ChoosePathController

    beforeEach(() => {
    angular.mock.module('profitelo.controller.dashboard.service-provider.choose-path')
      inject(($rootScope, $controller) => {
        ChoosePathController = $controller('ChoosePathController', {
          profileStatus: {}
        })
      })
    })

    it('should exists', () => {
      return expect(!!ChoosePathController).toBe(true)
    })

  })
})
