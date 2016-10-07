(function() {
  function proTagsSlider($window, $location, $timeout) {
    function linkFunction(scope, element) {
      let currentWidth = 0
      let elementsMap = []
      let currentElement = 0

      scope.leftOffset = {left: 0}

      angular.element($window).on('resize', ()=> {
        currentWidth = $('.slider-tag').width()
        scope.leftOffset = {left: 0}
        currentElement = 0
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

      const _clearSlider = () => {
        scope.leftOffset = {left: 0}
        currentElement = 0
      }

      let _calculateOffset = (elem) => {
        let offset = 0
        for (let i = 0; i < elem; i++) {
          offset = offset + elementsMap[i] + 16
        }
        return offset
      }

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
        }
      }

      // .slidePage offset right < .slider-tag offset right

      const tagsContainerOffsetRight = (($('.slider-tag').width()));
      let slidersOffsetRight = (($('.slide-page').width()));

      //console.log($window.innerWidth - ($('.slide-page').offset().left) )
      scope.nextSlide = (next=1) => {
        if (currentElement < elementsMap.length - next) {
          currentElement = currentElement + next
          scope.leftOffset = {left: _calculateOffset(currentElement) * -1}
        } else {
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