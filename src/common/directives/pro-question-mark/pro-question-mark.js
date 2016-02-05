function proQuestionMarkLinkFn($scope) => {
  if ($scope.tooltipTitle === 'undefined' || !$scope.tooltipTitle) {
    $scope.tooltipTitle = ''
  }
  if ($scope.tooltipPlacement === 'undefined' || !$scope.tooltipPlacement) {
    $scope.tooltipPlacement = 'bottom'
  }
}

angular.module('profitelo.directives.pro-question-mark', [])

.directive('proQuestionMark', () => {
  return {
    restrict:     'E',
    replace:      true,
    templateUrl:  'directives/pro-question-mark/pro-question-mark.tpl.html',
    scope: {
      tooltipTitle:     '@title',
      tooltipPlacement: '@placement'
    },
    link: proQuestionMarkLinkFn
  }
})
