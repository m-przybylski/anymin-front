describe('Unit tests: SummaryController >', () => {
  describe('Testing Controller: SummaryController', () => {

    let SummaryController
    let _scope

    let url = 'awesomeUrl/'

    beforeEach(angular.mock.module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.controller.dashboard.service-provider.summary')
      inject(($rootScope, $controller, _ServiceApi_, _User_) => {

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