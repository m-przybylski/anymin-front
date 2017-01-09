(function() {
  /* @ngInject */
  function controller($scope, $log, $element, $window) {
    this.stylesObject = {
      minHeight: null
    }

    this.isCollapsed = true

    const updateStylesObject = () => {
      if (!this.isCollapsed) {
        this.stylesObject.minHeight = getCollapseBtnContentHeight()
      }
      else {
        this.stylesObject.minHeight = getCollapseBtnHeight()
      }
    }

    this.collapseToggle = () => {
      this.isCollapsed = !this.isCollapsed
      updateStylesObject()
    }

    const getCollapseBtnHeight = () => {
      const _element = $element.find('.collapse-btn-header')[0]
      if (!!_element) {
        return _element.clientHeight
      } else {
        $log.error('Element not found')
        return 0
      }
    }

    const getCollapseBtnContentHeight = () => {
      const _element = $element.find('.collapse-btn-wrapper')[0]
      if (!!_element) {
        return _element.clientHeight
      } else {
        $log.error('Element not found')
        return 0
      }
    }

    const onWindowResize = () => {
      if (!this.isCollapsed) {
        this.stylesObject.minHeight = getCollapseBtnContentHeight()
      }
      else {
        this.stylesObject.minHeight = getCollapseBtnHeight()
      }

      $scope.$digest()
    }

    /* istanbul ignore next */
    angular.element($window).on('resize', onWindowResize)

    return this
  }

  const component = {
    templateUrl: 'components/interface/collapse-btn/collapse-btn.tpl.html',
    controllerAs: '$ctrl',
    transclude: true,
    controller: controller,
    bindings: {
      title: '@',
      icon: '@'
    }
  }

  angular.module('profitelo.components.interface.collapse-btn', [
    'pascalprecht.translate'
  ])
    .component('collapseBtn', component)

}())
