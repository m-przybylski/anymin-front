(function() {
  /* @ngInject */
  function controller($element, smoothScrolling, $window, $log, $scope, $timeout) {
    this.stylesObject = {
      height: null
    }

    this.isCollapsed = false

    const getFirstCollapseElementHeight = () => {
      const firstCollapseElement = $element.find('ng-transclude > div:first-child')
      if (firstCollapseElement) {
        return firstCollapseElement.height()
      } else {
        $log.error('In method getFirstCollapseElementHeight: element div:first-child not found')
        return 0
      }
    }

    const getCollapseWrapperHeight = () => {
      return $element.find('.collapse-content').height()
    }
    
    /* istanbul ignore next */
    const onWindowResize = () => {
      if (this.isCollapsed) {
        this.stylesObject.height = getCollapseWrapperHeight()
      } else {
        this.stylesObject.height = getFirstCollapseElementHeight()
      }
      $scope.$digest()
    }

    $timeout(() => {
      this.stylesObject.height = getFirstCollapseElementHeight()
    })
    
    /* istanbul ignore next */
    angular.element($window).on('resize', onWindowResize)

    this.toggleCollapse = () => {
      this.stylesObject.height = this.stylesObject.height !== getCollapseWrapperHeight() ?
        getCollapseWrapperHeight() : getFirstCollapseElementHeight()

      this.isCollapsed = !this.isCollapsed
      if (this.stylesObject.height !== getCollapseWrapperHeight()) {
        smoothScrolling.simpleScrollTo('#collapseWrap', true, 1000)
      }
    }

    this.checkedHeight = () => {
      return getFirstCollapseElementHeight() === getCollapseWrapperHeight()
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
