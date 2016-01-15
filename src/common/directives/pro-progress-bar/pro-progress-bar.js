function proProgressBar($rootScope, $q, toastr) {

  function proProgressBarLink(scope) {

    let _deferred = $q.defer()

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

    scope.saveSection = () => {
      $rootScope.$broadcast('isSectionValid')
    }

    scope.$on('sectionValidateResponse', (event, data) => {
      if (data.isValid) {
        if (scope.queue.sectionBeingEdited === -1) {
          scope.next()
        } else {
          $rootScope.$broadcast('saveEditing')
        }

      } else {
        toastr.error('not valid')
      }
    })



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

angular.module('profitelo.directives.pro-progress-bar', [
  'pascalprecht.translate',
  'toastr'
]).directive('proProgressBar', proProgressBar)

