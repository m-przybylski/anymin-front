(function() {
  function proTopNavbar() {

    function linkFunction() {
    }

    return {
      templateUrl: 'directives/interface/pro-top-navbar/pro-top-navbar.tpl.html',
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {

      }

    }

  }

  angular.module('profitelo.directives.interface.pro-top-navbar', [])
  .directive('proTopNavbar', proTopNavbar)

}())
