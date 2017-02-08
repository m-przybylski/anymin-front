(function() {

  function pageTitleDirective($rootScope, $filter) {

    function linkFunction(_scope, element, _attrs) {

      let pageTitle = ''

      function changePageTitle(text) {
        element.text(text)
      }

      $rootScope.$on('prependTitle', (_event, data) => {

        changePageTitle(data + ' - ' + pageTitle)

      })

      function traverseDownStates(data) {

        pageTitle = ''
        let currentLevel = data

        while (typeof currentLevel === 'object' && Object.getPrototypeOf(currentLevel)) {

          if (currentLevel.hasOwnProperty('pageTitle')) {

            if (pageTitle.length > 0) {
              pageTitle += ' - '
            }

            pageTitle += $filter('translate')(currentLevel.pageTitle)
          }

          currentLevel = Object.getPrototypeOf(currentLevel)
        }

        changePageTitle(pageTitle)
      }

      $rootScope.$on('$stateChangeStart', (_event, toState, _toParams, _fromState, _fromParams, _error) => {
        traverseDownStates(toState.data)
      })

    }

    return {
      restrict: 'A',
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.page-title', [
    'ui.router',
    'pascalprecht.translate'
  ])
  .directive('pageTitle', pageTitleDirective)

}())
