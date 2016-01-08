function proProgressBarLink(scope) {

  if (scope.caption.length === 0) {
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

}

angular.module('profitelo.directives.proProgressBar', [
  'pascalprecht.translate'
])
.directive('proProgressBar', function() {
  return {
    restrict:     'EA',
    replace:      true,
    templateUrl:  'directives/proProgressBar/proProgressBar.tpl.html',
    link: proProgressBarLink,
    scope: {
      progress: '=?proProgressBar',
      caption: '@'
    }
  }
})
