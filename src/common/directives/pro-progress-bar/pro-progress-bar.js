function proProgressBar($rootScope, $q, toastr) {

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

    scope.saveSection = () => {

      let _sectionOfInterest = scope.queue.sectionBeingEdited === -1 ? scope.queue.currentActiveSection : scope.queue.sectionBeingEdited
      $rootScope.$broadcast('isSectionValid', {
        section: _sectionOfInterest
      })
    }

    scope.$on('sectionValidateResponse', (event, data) => {
      if (data.isValid) {
        if (scope.queue.sectionBeingEdited === -1) {
          $rootScope.$broadcast('saveSection', scope.queue.currentActiveSection)
          scope.next()
        } else {
          $rootScope.$broadcast('saveSection')
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

