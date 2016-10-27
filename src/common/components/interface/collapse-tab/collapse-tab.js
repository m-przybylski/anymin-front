(function (){
  /* @ngInject */
  function controller($element, $window, $timeout) {
    this.objectHeight = {
      height: null
    }

    let elementHeight = 0
    let singleElementHeight = 0

    const setUpHeights = () => {
      elementHeight = $element.find('.collapse-wrapper').height()
      singleElementHeight =  $element.find('ng-transclude > div').height() + 32
      this.objectHeight.height = singleElementHeight
    }

    $timeout(() => {
      setUpHeights()
    })

    // angular.element($window).on('resize', ()=> {
    //   setUpHeights()
    // })
    //
    this.collapsing = () => {
      this.objectHeight.height = this.objectHeight.height !== elementHeight ? elementHeight : $element.find('ng-transclude > div').height() + 32
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


  angular.module('profitelo.components.interface.collapse-tab', [])
    .component('collapseTab', collapseTab)

}())
