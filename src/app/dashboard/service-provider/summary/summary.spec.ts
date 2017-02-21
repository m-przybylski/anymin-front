namespace profitelo.app.dashboard.serviceProvider.summary {
  import IServiceApi = profitelo.api.IServiceApi
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
        inject(($rootScope: IRootScopeService, $controller: ng.IControllerService, _ServiceApi_: IServiceApi, _User_: any) => {

          _scope = $rootScope.$new()


          SummaryController = $controller('SummaryController', {
            $scope: _scope,
            ServiceApi: _ServiceApi_,
            User: _User_,
            savedProfile: {}
          })

        })
      })

      it('should exists', () => {
        return expect(!!SummaryController).toBe(true)
      })

    })
  })
}
