(function() {

  /* @ngInject */
  function defaultSliderFunction($scope, $window, $timeout, $element) {
    let currentWidth = 0
    let elementsMap = []
    let currentElement = 0

    angular.element($window).on('resize', ()=> {
      currentWidth = $($element).width()
      $element.css('left', '0')
    })

    $timeout(() => {
      this.controlls = {
        prevSlide: this.prevSlide,
        nextSlide: this.nextSlide
      }
    })


    $timeout(()=>{
      elementsMap = $.map($($element).find('.slides'), (div)=>{
        return div.clientWidth
      })
    })

    let _calculateOffset = (elem) => {
      let offset = 0
      for (let i = 0; i < elem; i++) {
        offset = offset + elementsMap[i] + 8
      }
      return offset
    }

    this.prevSlide = (next=1) => {
      if (currentElement > 0) {
        currentElement = currentElement - next
        $element.css('left', _calculateOffset(currentElement) * -1)
      }
    }

    this.nextSlide = (next=1) => {
      if (currentElement < elementsMap.length - next) {
        currentElement = currentElement + next
        $element.css('left', _calculateOffset(currentElement) * -1)
      } else {
        $element.css('left', '0')
        currentElement = 0
      }
    }

    return this
  }

  let slider = {
    transclude: true,
    bindings: {
      items: '<',
      controlls: '='
    },
    controllerAs: 'vm',
    controller: defaultSliderFunction
  }


  angular.module('profitelo.components.interface.slider', [
    'pascalprecht.translate'
  ])
    .component('slider', slider)

}())
