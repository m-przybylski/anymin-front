(function() {
  function proExpertFooter() {

    function linkFunction() {
    }

    return {
      templateUrl: 'directives/expert-profile/pro-expert-footer/pro-expert-footer.tpl.html',
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {

      }

    }

  }

  angular.module('profitelo.directives.expert-profile.pro-expert-footer', [])
  .directive('proExpertFooter', proExpertFooter)

}())
