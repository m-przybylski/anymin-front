(function() {

  function galleryModelController($scope, $uibModalInstance) {

    console.log($scope.slide)

    return this
  }

  angular.module('profitelo.common.controller.gallery-modal', [
    'ui.bootstrap'
  ])
  .controller('galleryModelController', galleryModelController)

}())
