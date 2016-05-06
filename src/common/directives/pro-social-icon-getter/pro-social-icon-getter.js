(function() {

  function proSocialIconGetter(HelperService) {

    function proSocialIconGetterLink(scope) {
      
      scope.$watch('url', function(newVal, oldVal) {
        scope.social = HelperService.socialUrlResolver(newVal)
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
    'profitelo.services.helper-service'
  ])
  .directive('proSocialIconGetter', proSocialIconGetter)

}())



