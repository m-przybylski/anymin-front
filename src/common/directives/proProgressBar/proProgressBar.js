function proProgressBarLink(scope) {

  if (!scope.progress) {
    scope.progress = 0
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
    link:         proProgressBarLink,
    scope: {
      progress: '=proProgressBar'
    }
  }
})
