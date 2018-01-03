(function(): void {

  /* @ngInject */
  function controller(): void {

    return this
  }

  const socialLinks = {
    template: require('./social-links.pug'),
    restrict: 'E',
    replace: true,
    bindings: {
      links: '<'
    },
    controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.expert-profile.social-links', [
  ])
    .component('socialLinks', socialLinks)

}())
