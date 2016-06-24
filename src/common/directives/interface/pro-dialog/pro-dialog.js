(function() {
  function proDialog($uibModal) {

    function linkFunction(scope, element, attr) {

        $uibModal.open({
          backdrop: true,
          keyboard: true,
          modalFade: true,
          animation: true,
          templateUrl: 'directives/interface/pro-dialog/pro-dialog.tpl.html',
          size: 300
        })
    }

    return {
      restrict:     'A',
      replace:      true,
      link: linkFunction,
      scope: {
      }
    }
  }

  angular.module('profitelo.directives.interface.pro-dialog', [
      'ui.bootstrap'
  ])
    .directive('proDialog', proDialog)

}())