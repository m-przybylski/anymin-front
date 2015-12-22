describe('Unit tests: expert-profile >', function() {
    describe('Testing Controller: ExpertProfileController', function() {

        var $scope;
        var ExpertProfileController;
        var _$state;

        beforeEach(function() {
            module('profitelo.controller.expert-profile');
            inject(function($rootScope, $controller, $state) {
                $scope = $rootScope.$new();
                ExpertProfileController = $controller('ExpertProfileController', {
                    $scope: $scope,
                    $rootScope: $rootScope,
                    $state: $state
                });
                _$state = $state;
            });
        });

        it("should exsist", function() {
            return expect(!!ExpertProfileController).toBe(true);
        });

    });
});
