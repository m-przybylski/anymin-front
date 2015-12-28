describe('Unit tests: expert-profile >', () => {
  describe('Testing Controller: ExpertProfileController', () => {

    var $scope;
    var ExpertProfileController;

    beforeEach(() => {
      module('profitelo.controller.expert-profile');
      inject(($rootScope, $controller, $state) => {
        $scope = $rootScope.$new();
        ExpertProfileController = $controller('ExpertProfileController', {
          $scope: $scope,
          $rootScope: $rootScope,
          $state: $state
        });
      });
    });

    it('should exsist', () => {
      return expect(!!ExpertProfileController).toBe(true);
    });

  });
});
