(function() {

  let proLightboxNav = {
    transclude: true,
    template: require('./pro-lightbox-nav.jade')(),
    bindings: {
      navSettings: '=?'
    }
  }

  angular.module('profitelo.components.pro-lightbox-nav', [

  ])
    .component('proLightboxNav', proLightboxNav)

}())
