(function() {
  function proExpertSocialIcons() {

    function linkFunction() {
    }

    return {
      templateUrl: 'directives/expert-profile/pro-expert-social-icons/pro-expert-social-icons.tpl.html',
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {
        links: '=?'
      }
    }
  }

  angular.module('profitelo.directives.expert-profile.pro-expert-social-icons', [])
  .directive('proExpertSocialIcons', proExpertSocialIcons)

}())
