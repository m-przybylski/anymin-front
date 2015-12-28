describe('Unit tests: Home section >', () => {
  describe('Testing Controller: HomeController', () => {

    var $scope;
    var HomeController;

    beforeEach(() => {
      module('profitelo.controller.home');
      inject(($rootScope, $controller, $state, _AccountRest_) => {
        $scope = $rootScope.$new();
        HomeController = $controller('HomeController', {
          $scope: $scope,
          $rootScope: $rootScope,
          $state: $state,
          AccountRest: _AccountRest_
        });
      });
    });


    it('should exists', () => {
      return expect(!!HomeController).toBe(true);
    });

  });
});
