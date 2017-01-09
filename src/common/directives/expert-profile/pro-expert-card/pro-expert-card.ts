(function() {
  function proExpertCard($timeout) {
    function linkFunction($window, $element) {
      this.translations = {
        'available': 'HOME.EXPERT_CARD_AVAILABLE',
        'not-available': 'HOME.EXPERT_CARD_NOT_AVAILABLE',
        'busy': 'HOME.EXPERT_CARD_BUSY'
      }

      return this
    }

    return {
      templateUrl:  'directives/expert-profile/pro-expert-card/pro-expert-card.tpl.html',
      restrict:     'E',
      replace:      true,
      link:         linkFunction,
      scope: {
        items: '<'
      }
    }
  }

  angular.module('profitelo.directives.pro-expert-card', [])
  .directive('proExpertCard', proExpertCard)

}())
