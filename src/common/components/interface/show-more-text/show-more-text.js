(function() {
  /* @ngInject */
  function showMoreTextController($element, $filter, $timeout, $window, $scope) {
    this.isCollapsed = false
    this.readMoreVisivle = false

    this.textShort = $filter('limitTo')(this.text, 300, 0)
    this.textLong = $filter('limitTo')(this.text, this.text.length, 300)

    $timeout(() => {
      this.heightElements = {
        shortTextHeight: $($element.find('.short-text').height()),
        descriptionHeight: $($element.find('.description > p').height())
      }

      this.textHeight = {
        height: this.heightElements.shortTextHeight[0]
      }

      if (this.text.length > 300) {
        this.readMoreVisivle = true
      }

      this.showMoreText = () => {
        if (this.isCollapsed == false) {
          this.textHeight = {
            height: this.heightElements.descriptionHeight[0]
          }
        } else {
          this.textHeight = {
            height: this.heightElements.shortTextHeight[0]
          }
        }
        this.isCollapsed = !this.isCollapsed
      }
    })

    /* istanbul ignore next */
    angular.element($window).on('resize', ()=> {
      this.heightElements = {
        shortTextHeight: $($element.find('.short-text').height()),
        descriptionHeight: $($element.find('.description > p').height())
      }

      if (this.isCollapsed == true) {
        this.textHeight.height = this.heightElements.descriptionHeight[0]
      } else {
        this.textHeight.height = this.heightElements.shortTextHeight[0]
      }
      $scope.$digest()
    })
    
    return this


  }

  const showMoreText = {
    transclude: true,
    templateUrl:    'components/interface/show-more-text/show-more-text.tpl.html',
    bindings: {
      text: '<'
    },
    controllerAs: 'vm',
    controller: showMoreTextController
  }

  angular.module('profitelo.components.interface.show-more-text', [
    'pascalprecht.translate'
  ])
    .component('showMoreText', showMoreText)

}())
