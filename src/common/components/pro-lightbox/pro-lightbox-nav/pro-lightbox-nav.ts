(function() {

  let proLightboxNav = {
    transclude: true,
    template: require('./pro-lightbox-nav.pug')(),
    bindings: {
      navSettings: '=?'
    }
  }

  angular.module('profitelo.components.pro-lightbox-nav', [

  ])
    .component('proLightboxNav', proLightboxNav)

}())
