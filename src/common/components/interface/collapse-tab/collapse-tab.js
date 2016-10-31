(function (){
  /* @ngInject */
  function controller($element, smoothScrolling, $window, $scope, $timeout) {
    this.objectHeight = {
      height: null
    }
    this.changeIcon = false

    let elementHeight = 0
    let singleElementHeight = 0

    const setUpHeights = () => {
      const singleElement =  $element.find('ng-transclude > div')

      singleElementHeight =  singleElement.height()
      elementHeight = singleElementHeight * singleElement.length
      this.objectHeight.height = singleElementHeight
    }

    $timeout(() => {
      setUpHeights()
    })

    angular.element($window).on('resize', ()=> {
      setUpHeights()
      $scope.$digest()
    })

    this.collapsing = () => {
      this.objectHeight.height = this.objectHeight.height !== elementHeight ? elementHeight : $element.find('ng-transclude > div').height()
      this.changeIcon = !this.changeIcon
      if (this.objectHeight.height !== elementHeight) {
        smoothScrolling.simpleScrollTo('#collapseWrap', true, 500)
      }
    }

    this.checkedHeight = () => {
      return elementHeight === singleElementHeight
    }


    return this
  }

  const collapseTab = {
    templateUrl: 'components/interface/collapse-tab/collapse-tab.tpl.html',
    controllerAs: '$ctrl',
    transclude: true,
    controller: controller
  }


  angular.module('profitelo.components.interface.collapse-tab', [
    'profitelo.directives.services.smooth-scrolling'
  ])
    .component('collapseTab', collapseTab)

}())
