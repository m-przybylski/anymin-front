(function() {
  function proExpertSocialIcons() {

    return {
      templateUrl: 'directives/expert-profile/pro-expert-social-icons/pro-expert-social-icons.tpl.html',
      restrict: 'E',
      replace: true,
      scope: {
        links: '=?'
      }
    }
  }

  angular.module('profitelo.directives.expert-profile.pro-expert-social-icons', [])
  .directive('proExpertSocialIcons', proExpertSocialIcons)

}())
