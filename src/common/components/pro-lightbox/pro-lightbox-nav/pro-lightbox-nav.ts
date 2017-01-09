(function() {

  let proLightboxNav = {
    transclude: true,
    templateUrl: 'components/pro-lightbox/pro-lightbox-nav/pro-lightbox-nav.tpl.html',
    bindings: {
      navSettings: '=?'
    }
  }

  angular.module('profitelo.components.pro-lightbox-nav', [

  ])
    .component('proLightboxNav', proLightboxNav)

}())