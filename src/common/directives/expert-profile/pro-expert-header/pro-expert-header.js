(function() {
  function proExpertHeader() {

    function linkFunction() {
    }

    return {
      templateUrl: 'directives/expert-profile/pro-expert-header/pro-expert-header.tpl.html',
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {
        name: '=?',
        description: '=?',
        languages: '=?',
        avatar: '=?'
      }
    }
  }

  angular.module('profitelo.directives.expert-profile.pro-expert-header', [])
  .directive('proExpertHeader', proExpertHeader)

}())
