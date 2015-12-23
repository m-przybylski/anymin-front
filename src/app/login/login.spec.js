describe('Unit tests: login>', ()=> {
    describe('Testing Controller: LoginController', ()=> {

        var $scope;
        var LoginController;
        var _$state;

        beforeEach(() => {
            module('profitelo.controller.login');
            inject(function($rootScope, $controller, $state) {
                $scope = $rootScope.$new();
                LoginController = $controller('LoginController', {
                    $scope: $scope,
                    $rootScope: $rootScope,
                    $state: $state
                });
                _$state = $state;
            });
        });

        it("should exsist", ()=> {
            return expect(!!LoginController).toBe(true);
        });

    });
});
