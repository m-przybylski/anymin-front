(function (){
  /* @ngInject */
  function controller($element, $timeout, smoothScrolling) {
    this.objectHeight = {
      height: null
    }

    this.changeIcon = false
    this.isCollapsed = true

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

    this.collapsing = () => {
      console.log("clicked")
      this.objectHeight.height = this.objectHeight.height !== elementHeight ? elementHeight : $element.find('ng-transclude > div').height() + 32

      this.changeIcon = !this.changeIcon
      this.isCollapsed = !this.isCollapsed

      if (this.isCollapsed)
        smoothScrolling.simpleScrollTo('.show-more-text')
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
