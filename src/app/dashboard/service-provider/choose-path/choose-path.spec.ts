import * as angular from "angular"
import "./choose-path"

describe('Unit tests: ChoosePathController >', () => {
  describe('Testing Controller: ChoosePathController', () => {

    var ChoosePathController: any

    beforeEach(() => {
    angular.mock.module('profitelo.controller.dashboard.service-provider.choose-path')
      inject(($controller: ng.IControllerService) => {
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
