angular.module('profitelo.controller.test',[

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