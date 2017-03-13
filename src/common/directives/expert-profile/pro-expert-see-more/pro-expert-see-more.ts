(function () {
  function proExpertSeeMore() {


    return {
      template: require('./pro-expert-see-more.jade')(),
      restrict: 'E',
      replace: true
    }
  }

  angular.module('profitelo.directives.pro-expert-see-more', [])
    .directive('proExpertSeeMore', proExpertSeeMore)

}())
