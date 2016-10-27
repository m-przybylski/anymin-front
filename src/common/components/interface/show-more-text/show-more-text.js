(function() {
  /* @ngInject */
  function showMoreTextController($element, $timeout) {
    this.defaultTextHeight = '44px'
    this.toogleStatus = false
    this.showDotsMore = true

    this.textHeight = {
      height: this.defaultTextHeight
    }

    $timeout(()=>{
      this.heightFullText = $($element.find('p').height())
      this.textLimit = 300

      this.showMoreText = () => {
        this.changeIcon = !this.changeIcon
        this.showDotsMore = !this.showDotsMore
        this.textLimit = this.textLimit === null ? 300 : null

        if (this.toogleStatus === false) {
          this.textHeight.height = this.heightFullText[0]

          this.toogleStatus = true
        } else {
          this.textHeight.height = this.defaultTextHeight

          this.toogleStatus = false
        }
      }
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
