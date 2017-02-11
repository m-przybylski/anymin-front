namespace profitelo.directives.proSocialIconGetter {

  import IUrlService = profitelo.services.helper.IUrlService

  function proSocialIconGetter(urlService: IUrlService) {

    function proSocialIconGetterLink(scope: any) {

      scope.$watch('url', function(newVal: string, _oldVal: string) {
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

}



