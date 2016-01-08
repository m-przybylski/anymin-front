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

angular.module('profitelo.directives.pro-progress-bar', [
  'pascalprecht.translate'
])

.directive('proProgressBar', function() {
  return {
    restrict:     'EA',
    replace:      true,
    link: proProgressBarLink,
    templateUrl:  'directives/pro-progress-bar/pro-progress-bar.tpl.html',
    scope: {
      progress: '=?proProgressBar',
      caption: '@'
    }
  }
})
