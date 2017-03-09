import * as angular from "angular"
import {Tag} from "../../api/model/Tag"
import {IWindowService} from "../../services/window/window.service"

function proTagsSlider($window: IWindowService, $location: ng.ILocationService, $timeout: ng.ITimeoutService) {
  function linkFunction(scope: any, element: ng.IRootElementService) {

    let tagsContainerWidth = element.find('.slider-tag')[0].clientWidth
    let elementsMap: Array<number> = []
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

    const _calculateOffset = (elem: number) => {
      let offset = 0
      for (let i = 0; i < elem; i++) {
        offset = offset + elementsMap[i] + 8
      }
      return offset
    }

    /* istanbul ignore next */
    angular.element($window).on('resize', () => {
      _clearSlider()
    })

    scope.$watch(() => {
      return scope.tags
    }, (newValue: Array<Tag>, _oldValue: Array<Tag>) => {
      if (newValue) {
        elementsMap = $.map($(element).find('.slide-page li'), (li) => {
          return li.clientWidth
        })
      }
    })

    scope.tagAction = (tag: Tag) => {
      if (tag.id !== $location.search().tagId) {
        scope.onTagClickAction(tag)
        _clearSlider()
      }
    }

    scope.prevSlide = (next = 1) => {
      if (currentElement > 0) {
        currentElement = currentElement - next
        scope.leftOffset = {left: _calculateOffset(currentElement) * -1}
        scope.slidesContainerOffsetWidth = element.find('.slide-page')[0].clientWidth + _calculateOffset(currentElement)
      }
    }

    scope.nextSlide = (next = 1) => {
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
    template: require('./pro-tags-slider.jade')(),
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
