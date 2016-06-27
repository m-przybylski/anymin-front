(function() {
  function DialogService($uibModal) {

    return {
      openDialog: (scope, callback)=> {
        $uibModal.open({
          backdrop: 'static',
          keyboard: true,
          scope: scope,
          controller: ($uibModalInstance)=> {
            scope.ok = ()=> {
              if (angular.isFunction(callback)) {
                callback()
              }
              $uibModalInstance.close('cancel')
            }
            scope.cancel = ()=> {
              $uibModalInstance.dismiss('cancel')
            }
          },
          modalFade: true,
          animation: true,
          templateUrl: 'templates/dialog/pro-dialog.tpl.html',
          size: 300
        })
      }
    }
  }

  angular.module('profitelo.services.dialog-service', [
    'ui.bootstrap'
  ])
    .service('DialogService', DialogService)

}())