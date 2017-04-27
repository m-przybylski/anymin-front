namespace profitelo.app.dashboard.client {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit tests: clientController >', () => {
    describe('Testing Controller: clientController', () => {

      let clientController: any

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeUrl')
      }))

      beforeEach(() => {
        angular.mock.module('profitelo.controller.dashboard.client')
        angular.mock.module('ui.router')
        inject(($rootScope: IRootScopeService, $controller: ng.IControllerService) => {
          clientController = $controller('clientController', {
            $scope: $rootScope.$new()
          })
        })
      })

      it('should exists', () => {
        expect(!!clientController).toBe(true)
      })
    })
  })
}
