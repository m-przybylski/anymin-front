import * as angular from "angular"
import "./error"
describe('Unit tests: ErrorController >', () => {
  describe('Testing Controller: ErrorController', () => {

    var ErrorController: any

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
