(function() {

  /* @ngInject */
  function mouseSliderFunction($scope, $element, $timeout) {
    let userWindowWidth = window.innerWidth

    let containerWidth
    let countOfObject = 10
    let elementsMap = []
    let itemWidth

    $timeout(()=>{
      elementsMap = $.map($($element).find('div'), (div)=>{
        return div.clientWidth
      })
    })

    $element.on('mousemove', function(event) {
      itemWidth = elementsMap[0]
      containerWidth = itemWidth * countOfObject
      let leftOffset = $element[0].offsetLeft
      let currentPossition = event.pageX
      let moveSlides = (-currentPossition * (containerWidth/userWindowWidth)) + (containerWidth / 2) - (itemWidth * 2)
      $element.css('margin-left', moveSlides).css('width', containerWidth)
    })
    
    return this
  }

  let mouseSlider = {
    transclude: true,
    bindings: {
      items: '<'
    },
    controller: mouseSliderFunction
  }


  angular.module('profitelo.components.interface.mouse-slider', [
    'pascalprecht.translate'
  ])
    .component('mouseSlider', mouseSlider)

}())
