(function() {
  function proExpertSocialIcons() {

    return {
      template: require('./pro-expert-social-icons.pug')(),
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
