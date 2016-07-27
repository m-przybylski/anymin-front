(function() {

  function showMoreTextController() {

    this.textLimit = 500

    this.showMoreText = () => {
      this.textLimit = this.textLimit === null ? 500 : null
      this.changeIcon = !this.changeIcon
    }

    return this

  }

  let showMoreText = {
    transclude: true,
    templateUrl:    'components/interface/show-more-text/show-more-text.tpl.html',
    bindings: {
      text: '<'
    },
    controllerAs: 'vm',
    controller: showMoreTextController
  }

  angular.module('profitelo.components.interface.show-more-text', [
    'pascalprecht.translate'
  ])
    .component('showMoreText', showMoreText)

}())
