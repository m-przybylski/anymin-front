describe('Unit tests: registration>', () => {
    describe('Testing Controller: RegistrationController', () => {

        var $scope;
        var RegistrationController;
        var _$state;

        beforeEach(() => {
            module('profitelo.controller.registration');
            inject(($rootScope, $controller, $state) => {
                $scope = $rootScope.$new();
                RegistrationController = $controller('RegistrationController', {
                    $scope: $scope,
                    $rootScope: $rootScope,
                    $state: $state
                });
                _$state = $state;
            });
        });

        it("should exsist", ()=> {
            return expect(!!RegistrationController).toBe(true);
        });

    });
});
