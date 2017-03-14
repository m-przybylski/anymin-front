import * as angular from "angular"
import {ServiceApi} from "profitelo-api-ng/api/api"
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import "./summary"
describe('Unit tests: SummaryController >', () => {
  describe('Testing Controller: SummaryController', () => {

    let SummaryController: any
    let _scope: any

    let url = 'awesomeUrl/'

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.controller.dashboard.service-provider.summary')
      inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _ServiceApi_: ServiceApi) => {

        _scope = $rootScope.$new()


        SummaryController = $controller('SummaryController', {
          $scope: _scope,
          ServiceApi: _ServiceApi_,
          savedProfile: {}
        })

      })
    })

    it('should exists', () => {
      return expect(!!SummaryController).toBe(true)
    })

  })
})
