(function() {

  /* @ngInject */
  function controller() {

    return this
  }

  let socialLinks = {
    template: require('./social-links.jade')(),
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
