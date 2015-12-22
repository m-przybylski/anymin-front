describe('Unit tests: Home section >', function() {
    describe('Testing Controller: HomeController', function() {

        var $scope;
        var HomeController;
        var _$state;

        beforeEach(function() {
            module('profitelo.controller.home');
            inject(function($rootScope, $controller, $state) {
                $scope = $rootScope.$new();
                HomeController = $controller('HomeController', {
                    $scope: $scope,
                    $rootScope: $rootScope,
                    $state: $state
                });
                _$state = $state;
            });
        });



        it("shdould exsist", function() {
            return expect(!!HomeController).toBe(true);
        });

    });
});
