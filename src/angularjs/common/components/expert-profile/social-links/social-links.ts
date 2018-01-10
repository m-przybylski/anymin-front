(function(): void {

  function controller(): void {

    return this
  }

  const socialLinks = {
    template: require('./social-links.html'),
    restrict: 'E',
    replace: true,
    bindings: {
      links: '<'
    },
    controller: [controller],
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.expert-profile.social-links', [
  ])
    .component('socialLinks', socialLinks)

}())
