(function() {
  /* @ngInject */
  function showMoreTextController($element, $timeout) {
    this.defaultTextHeight = '92px'
    this.toogleStatus = false

    this.textHeight = {
      'height': this.defaultTextHeight
    }

    $timeout(()=>{
      this.heightFullText = $($element.find('p').height())

      this.showMoreText = () => {
        this.changeIcon = !this.changeIcon

        if (this.toogleStatus === false) {
          this.textHeight = {
            'height': this.heightFullText[0]
          }
          this.toogleStatus = true
        } else {
          this.textHeight = {
            'height': this.defaultTextHeight
          }
          this.toogleStatus = false
        }
      }
    })

    this.textLimit = 500

    return this

  }

  let showMoreText = {
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
