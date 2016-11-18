(function() {
  /* @ngInject */
  function controller($element, smoothScrolling, $window, $scope, $timeout) {
    this.objectHeight = {
      height: null
    }
    
    this.isCollapse = false

    let elementHeight = 0
    let singleElementHeight = 0

    let setUpHeights = () => {
      singleElementHeight =  $element.find('ng-transclude > div:first-child').height()
      elementHeight = $element.find('.collapse-content').height()
    }

    $timeout(() => {
      setUpHeights()
      this.objectHeight.height = singleElementHeight
    })

    angular.element($window).on('resize', ()=> {
      setUpHeights()

      if (this.isCollapse) {
        this.objectHeight.height = elementHeight
      } else {
        this.objectHeight.height = singleElementHeight
      }
      $scope.$digest()
    })

    this.collapsing = () => {
      this.objectHeight.height = this.objectHeight.height !== elementHeight ? elementHeight : $element.find('ng-transclude > div').height()
      this.isCollapse = !this.isCollapse
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
