describe('Unit tests: Home section >', () => {
  describe('Testing Controller: HomeController', () => {

    var $scope;
    var HomeController;

    beforeEach(() => {
      module('profitelo.controller.home');
      inject(($rootScope, $controller, $state, _AccountsRestService_) => {
        $scope = $rootScope.$new();
        HomeController = $controller('HomeController', {
          $scope: $scope,
          $rootScope: $rootScope,
          $state: $state,
          AccountsRestService: _AccountsRestService_
        });
      });
    });


    it('should exists', () => {
      return expect(!!HomeController).toBe(true);
    });

  });
});
