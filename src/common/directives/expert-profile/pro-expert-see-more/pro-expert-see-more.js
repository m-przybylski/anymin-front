(function() {
  function proExpertSeeMore() {


    return {
      templateUrl:  'directives/expert-profile/pro-expert-see-more/pro-expert-see-more.tpl.html',
      restrict:     'E',
      replace:      true
    }
  }

  angular.module('profitelo.directives.pro-expert-see-more', [])
  .directive('proExpertSeeMore', proExpertSeeMore)

}())
