(function() {

  /* @ngInject */
  function controller() {

    return this
  }

  let socialLinks = {
    templateUrl: 'components/expert-profile/social-links/social-links.tpl.html',
    restrict: 'E',
    replace: true,
    bindings: {
      links: '<'
    },
    controller: controller,
    controllerAs: '$ctrl'
  }


  angular.module('profitelo.components.expert-profile.social-links', [
  ])
    .component('socialLinks', socialLinks)

}())
