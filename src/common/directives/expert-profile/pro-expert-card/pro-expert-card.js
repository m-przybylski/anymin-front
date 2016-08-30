(function() {
  function proExpertCard($timeout) {
    function linkFunction($window, $element) {
      this.translations = {
        'available': 'HOME.EXPERT_CARD_AVAILABLE',
        'not-available': 'HOME.EXPERT_CARD_NOT_AVAILABLE',
        'busy': 'HOME.EXPERT_CARD_BUSY'
      }

      let elementsMap = []
      let allElementsMap = []
      let currentElement = 0

      angular.element($window).on('resize', ()=> {
        currentWidth = $($element).width()
        $element.css('left', '0')
      })

      /* istanbul ignore next */
      $timeout(() => {
        elementsMap = $.map($($element).find('>div'), (div) => {
          return div.offsetWidth
        })

        allElementsMap = $.map($($element).find('>div'), (div) => {
          return div
        })
      })

      const _calculateOffset = (elem) => {
        let offset = 0
        for (let i = 0; i < elem; i++) {
          offset = offset + elementsMap[1]
        }
        return offset
      }

      this.prevSlide = (next=1) => {

      }

      this.nextSlide = (next=1) => {
        let parentWidth = $element[0].offsetWidth
        let visibleItem = Math.floor(parentWidth / elementsMap[1])

        currentElement = currentElement + next
        $element.css('left', _calculateOffset(currentElement) * -1)
      }

    }

    return {
      templateUrl:  'directives/expert-profile/pro-expert-card/pro-expert-card.tpl.html',
      restrict:     'E',
      replace:      true,
      link:         linkFunction,
      scope: {
        items: '='
      }
    }
  }

  angular.module('profitelo.directives.pro-expert-card', [])
  .directive('proExpertCard', proExpertCard)

}())
