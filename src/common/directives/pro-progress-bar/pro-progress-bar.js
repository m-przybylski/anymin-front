function proProgressBar($rootScope) {

  function proProgressBarLink(scope) {

    if (!scope.caption || scope.caption.length === 0) {
      throw new Error('proProgressBar needs caption parameter to work.')
    }

    if (!scope.progress) {
      scope.progress = {
        value: 0
      }
    } else {
      scope.progress = {
        value: scope.progress
      }
    }

    scope.cancelEditing = () => {
      $rootScope.$broadcast('cancelEditing')
    }

    scope.saveEditing = () => {
      $rootScope.$broadcast('saveEditing')
    }

  }

  return {
    restrict: 'EA',
    replace: true,
    link: proProgressBarLink,
    templateUrl: 'directives/pro-progress-bar/pro-progress-bar.tpl.html',
    scope: {
      progress: '=?',
      caption: '@',
      next: '=',
      queue: '='
    }
  }
}

angular.module('profitelo.directives.pro-progress-bar', ['pascalprecht.translate']).directive('proProgressBar', proProgressBar)

