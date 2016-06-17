(function() {
  function proExpertCard() {

    function linkFunction(scope, attr, elem) {
      scope.translations = {
        'available': 'HOME.EXPERT_CARD_AVAILABLE',
        'not-available': 'HOME.EXPERT_CARD_NOT_AVAILABLE',
        'busy': 'HOME.EXPERT_CARD_BUSY'
      }
    }

    return {
      templateUrl:  'directives/pro-expert-card/pro-expert-card.tpl.html',
      restrict:     'E',
      replace:      true,
      link: linkFunction,
      scope: {
        ngModel: '='
      }
    }
  }

  angular.module('profitelo.directives.pro-expert-card', [])
  .directive('proExpertCard', proExpertCard)

}())
