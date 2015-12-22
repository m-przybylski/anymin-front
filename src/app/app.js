var profiteloApp = angular.module('profitelo', [
    'profitelo.controller.dashboard',
    'profitelo.controller.home'
])




.controller('HomeController', ['$scope', function($scope) {

        for (let i = 0; i <= 10; i++) {
            console.log(i);
        }

        $scope.test = () => {
            alert("22 " + i);
        };

        setTimeout( () => {
            "use strict";
            $scope.test()
        },
        1000);
}]);