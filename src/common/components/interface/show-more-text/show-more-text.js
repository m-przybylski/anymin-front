(function() {
  /* @ngInject */
  function showMoreTextController($filter, $log, $timeout, $window, $scope) {
    const collapsibleLength = 300
    this.isCollapsed = false
    this.isCollapsible = (this.text.length > collapsibleLength)

    this.descriptionStyles = {
      height: null
    }

    this.textShort = $filter('limitTo')(this.text, collapsibleLength, 0)
    this.textLong = $filter('limitTo')(this.text, this.text.length, collapsibleLength)

    const getTextShortElementHeight = () => {
      const _element = angular.element('.short-text')[0]
      if (!!_element) {
        return _element.offsetHeight
      } else {
        $log.error('Element not found')
        return 0
      }
    }

    const getTextLongElementHeight = () => {
      const _element = angular.element('.description > p')[0]
      if (!!_element) {
        return _element.offsetHeight
      } else {
        $log.error('Element not found')
        return 0
      }
    }
    
    const updateHeight = () => {
      if (this.isCollapsed === true) {
        this.descriptionStyles.height = getTextLongElementHeight()
      } else {
        this.descriptionStyles.height = getTextShortElementHeight()
      }
    }

    this.showMoreText = () => {
      this.isCollapsed = !this.isCollapsed
      updateHeight()
    }

    $timeout(updateHeight)

    /* istanbul ignore next */
    angular.element($window).on('resize', () => {
      updateHeight()
      $scope.$digest()
    })

    return this
  }

  const showMoreText = {
    transclude: true,
    templateUrl:    'components/interface/show-more-text/show-more-text.tpl.html',
    bindings: {
      text: '@'
    },
    controller: showMoreTextController
  }

  angular.module('profitelo.components.interface.show-more-text', [
    'pascalprecht.translate'
  ])
    .component('showMoreText', showMoreText)

}())
