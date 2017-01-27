(function() {

  function proSocialIconGetter(urlService) {

    function proSocialIconGetterLink(scope) {
      
      scope.$watch('url', function(newVal, oldVal) {
        scope.social = urlService.resolveSocialUrl(newVal)
      })
    }

    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      templateUrl: 'directives/pro-social-icon-getter/pro-social-icon-getter.tpl.html',
      scope: {
        url: '='
      },
      link: proSocialIconGetterLink
    }
  }

  angular.module('profitelo.directives.pro-social-icon-getter', [
    'profitelo.services.url'
  ])
  .directive('proSocialIconGetter', proSocialIconGetter)

}())



