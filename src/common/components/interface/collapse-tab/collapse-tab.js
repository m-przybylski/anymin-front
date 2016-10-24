(function (){
  /* @ngInject */
  function controller($element) {

    this.isCollapse = true

    let collapseTabElement = $(".collapse-tab")
    let firstElementHeight = $($element).find('.single-consultation:first-child').height()
    let collapseTabElementHeight = $($element).find('.collapse-tab').height()

    console.log("qwe", firstElementHeight, collapseTabElementHeight)

    collapseTabElement.css("height", firstElementHeight)

    this.collapsing = () => {
      if (this.isCollapse) {
        this.isCollapse = !this.isCollapse
        collapseTabElement.css("height", collapseTabElementHeight)
      } else {
        this.isCollapse = !this.isCollapse
        collapseTabElement.css("height", firstElementHeight)
      }
    }

    return this
  }

  let collapseTab = {
    templateUrl: 'components/interface/collapse-tab/collapse-tab.tpl.html',
    controllerAs: '$ctrl',
    controller: controller
  }


  angular.module('profitelo.components.interface.collapse-tab', [
    'profitelo.directives.expert-profile.pro-expert-single-consultation'
  ])
    .component('collapseTab', collapseTab)

}())
