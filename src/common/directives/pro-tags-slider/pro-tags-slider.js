(function() {
  function proTagsSlider($window, $location, $timeout) {
    function linkFunction(scope, element) {

      let tagsContainerWidth = element.find('.slider-tag')[0].clientWidth
      let elementsMap = []
      let currentElement = 0

      scope.slidesContainerOffsetWidth = 0

      scope.leftOffset = {left: 0}

      $timeout(() => {
        scope.slidesContainerOffsetWidth = element.find('.slide-page')[0].clientWidth
      })

      const _clearSlider = () => {
        scope.leftOffset = {left: 0}
        currentElement = 0
        tagsContainerWidth = element.find('.slider-tag')[0].clientWidth
        scope.slidesContainerOffsetWidth = element.find('.slide-page')[0].clientWidth
      }

      const _calculateOffset = (elem) => {
        let offset = 0
        for (let i = 0; i < elem; i++) {
          offset = offset + elementsMap[i] + 8
        }
        return offset
      }
      
      /* istanbul ignore next */
      angular.element($window).on('resize', ()=> {
        _clearSlider()
      })

      scope.$watch(() => {
        return scope.tags
      }, (newValue, oldValue) => {
        if (newValue) {
          $timeout(() => {
            elementsMap = $.map($(element).find('.slide-page li'), (li)=>{
              return li.clientWidth
            })
          })
        }
      })

      scope.tagAction = (tag)=> {
        if (tag.id !==  $location.search().tagId) {
          scope.onTagClickAction(tag)
          _clearSlider()
        }
      }

      scope.prevSlide = (next=1) => {
        if (currentElement > 0) {
          currentElement = currentElement - next
          scope.leftOffset = {left: _calculateOffset(currentElement) * -1}
          scope.slidesContainerOffsetWidth = element.find('.slide-page')[0].clientWidth + _calculateOffset(currentElement)
        }
      }

      scope.nextSlide = (next=1) => {
        if (currentElement < elementsMap.length - next && tagsContainerWidth < scope.slidesContainerOffsetWidth) {
          currentElement = currentElement + next
          scope.leftOffset = {left: _calculateOffset(currentElement) * -1}
          scope.slidesContainerOffsetWidth = element.find('.slide-page')[0].clientWidth - _calculateOffset(currentElement)
        }
      }

      scope.leftArrowActive = () => {
        return currentElement > 0
      }

      scope.rightArrowActive = () => {
        return tagsContainerWidth < scope.slidesContainerOffsetWidth
      }
    }


    return {
      templateUrl: 'directives/pro-tags-slider/pro-tags-slider.tpl.html',
      restrict: 'E',
      replace: true,
      scope: {
        tags: '=?'
      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.pro-tags-slider', [])
    .directive('proTagsSlider', proTagsSlider)

}())