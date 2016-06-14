(function() {
  function proExpertHeader() {

    return {
      templateUrl: 'directives/expert-profile/pro-expert-header/pro-expert-header.tpl.html',
      restrict: 'E',
      replace: true,
      scope: {
        profile: '=?'
      }
    }
  }
  angular.module('profitelo.directives.expert-profile.pro-expert-header', [])
  .directive('proExpertHeader', proExpertHeader)

}())
