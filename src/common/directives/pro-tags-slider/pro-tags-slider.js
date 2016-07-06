(function() {
  function proTagsSlider($window, $timeout) {
    function linkFunction(scope, element) {
      let currentWidth = 0
      let elementsMap = []
      let currentElement = 0

      scope.leftOffset = {left: 0}

      angular.element($window).on('resize', ()=> {
        currentWidth = $('.slider-tag').width()
        scope.leftOffset = {left: 0}
      })

      $timeout(()=>{
        elementsMap = $.map($(element).find('.slide-page li'), (li)=>{
          return li.clientWidth
        })
      })

      let _calculateOffset = (elem) => {
        let offset = 0
        for (let i = 0; i < elem; i++) {
          offset = offset + elementsMap[i] + 16
        }
        return offset
      }

      scope.tagAction = (id)=> {
        scope.onTagClickAction(id)
      }

      scope.prevSlide = (next=1) => {
        if (currentElement > 0) {
          currentElement = currentElement - next
          scope.leftOffset = {left: _calculateOffset(currentElement) * -1}
        }
      }

      scope.nextSlide = (next=1) => {
        if (currentElement < elementsMap.length - next) {
          currentElement = currentElement + next
          scope.leftOffset = {left: _calculateOffset(currentElement) * -1}
        } else {
          scope.leftOffset = {left: 0}
          currentElement = 0
        }
      }
    }


    return {
      templateUrl: 'directives/pro-tags-slider/pro-tags-slider.tpl.html',
      restrict: 'E',
      replace: true,
      scope: {
        tags: '=?',
        onTagClickAction: '=?'

      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.pro-tags-slider', [])
    .directive('proTagsSlider', proTagsSlider)

}())
