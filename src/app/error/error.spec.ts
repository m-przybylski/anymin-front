describe('Unit tests: ErrorController >', () => {
  describe('Testing Controller: ErrorController', () => {

    var ErrorController

    beforeEach(() => {
      angular.mock.module('profitelo.controller.error')
      inject(($controller: ng.IControllerService) => {
        ErrorController = $controller('ErrorController', {
        })
      })
    })

    it('should exists', () => {
      return expect(!!ErrorController).toBe(true)
    })
  })
})
