(function() {
  function proTopNavbar() {

    return {
      templateUrl: 'directives/interface/pro-top-navbar/pro-top-navbar.tpl.html',
      restrict: 'E',
      replace: true
    }

  }

  angular.module('profitelo.directives.interface.pro-top-navbar', [])
  .directive('proTopNavbar', proTopNavbar)

}())
