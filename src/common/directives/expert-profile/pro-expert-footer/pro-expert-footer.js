(function() {
  function proExpertFooter() {

    return {
      templateUrl: 'directives/expert-profile/pro-expert-footer/pro-expert-footer.tpl.html',
      restrict: 'E',
      replace: true
    }
  }

  angular.module('profitelo.directives.expert-profile.pro-expert-footer', [])
  .directive('proExpertFooter', proExpertFooter)

}())
