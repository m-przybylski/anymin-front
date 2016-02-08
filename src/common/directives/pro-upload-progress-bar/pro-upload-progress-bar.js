function proUploadProgressBar($rootScope, $filter, $q, toastr) {

  function proUploadProgressBarLinkFn(scope) {
    scope.caption = ( angular.isUndefined(scope.caption) || !scope.caption || scope.caption.length === 0 ) ? '' : scope.caption
    scope.percentage = ( angular.isUndefined(scope.percentage) || !scope.percentage ) ? 0 : scope.percentage
  }

  return {
    restrict:     'EA',
    replace:      true,
    templateUrl:  'directives/pro-upload-progress-bar/pro-upload-progress-bar.tpl.html',
    scope: {
      percentage: '=',
      caption:    '@'
    },
    link: proUploadProgressBarLinkFn
  }
}

angular.module('profitelo.directives.pro-upload-progress-bar', [
  'pascalprecht.translate',
  'toastr'
])
.directive('proUploadProgressBar', proUploadProgressBar)
