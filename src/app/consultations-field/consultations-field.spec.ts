import * as angular from 'angular'
import './consultations-field'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
describe('Unit tests: Field section >', () => {
  describe('Testing Controller: ConsultationsFieldController', () => {

    let $scope: any
    let ConsultationsFieldController: any

    beforeEach(() => {
      angular.mock.module('profitelo.controller.consultations-field')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {
        $scope = $rootScope.$new()
        ConsultationsFieldController = $controller('ConsultationsFieldController', {
          $scope: $scope,
          $rootScope: $rootScope
        })
      })
    })

    it('should exists', () => {
      return expect(!!ConsultationsFieldController).toBe(true)
    })

  })
})
