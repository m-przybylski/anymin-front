(function() {

  /* @ngInject */
  function controller() {

    return this
  }

  let socialLinks = {
    templateUrl: 'components/dashboard/expert-profile/social-links/social-links.tpl.html',
    restrict: 'E',
    replace: true,
    bindings: {
      invitation: '<',
      employment: '<'
    },
    controller: controller,
    controllerAs: 'vm'
  }


  angular.module('profitelo.components.dashboard.expert-profile.social-links', [
    'profitelo.swaggerResources'
  ])
    .component('socialLinks', socialLinks)

}())
