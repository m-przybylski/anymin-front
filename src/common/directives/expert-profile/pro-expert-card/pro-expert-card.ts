import * as angular from 'angular'
import {IDirective} from 'angular'

(function(): void {
  function proExpertCard(): IDirective<ng.IScope, ng.IScope> {
    function linkFunction(): void {
      this.translations = {
        available: 'HOME.EXPERT_CARD_AVAILABLE',
        'not-available': 'HOME.EXPERT_CARD_NOT_AVAILABLE',
        busy: 'HOME.EXPERT_CARD_BUSY'
      }

      return this
    }

    return {
      template:  require('./pro-expert-card.pug')(),
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
