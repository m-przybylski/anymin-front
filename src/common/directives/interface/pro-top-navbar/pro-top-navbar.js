(function() {
  function proTopNavbar() {

    function linkFunction(scope, elem, attrs) {

      scope.menuElements = [
        {
          label: 'Strona Główna',
          link: 'app.home'
        },
        {
          label: 'O serwisie',
          link: 'app.home'
        },
        {
          label: 'Dla eksperta',
          link: 'app.home'
        },
        {
          label: 'Pomoc',
          link: 'app.home'
        }
      ]

    }
    
    return {
      templateUrl: 'directives/interface/pro-top-navbar/pro-top-navbar.tpl.html',
      restrict: 'E',
      replace: true,
      link: linkFunction
    }

  }

  angular.module('profitelo.directives.interface.pro-top-navbar', [])
  .directive('proTopNavbar', proTopNavbar)

}())
