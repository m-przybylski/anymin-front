(function() {

  /* @ngInject */
  function controller() {

    return this
  }

  const socialLinks = {
    template: require('./social-links.pug')(),
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
