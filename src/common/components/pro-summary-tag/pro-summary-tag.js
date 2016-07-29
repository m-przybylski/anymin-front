(function() {
  /* @ngInject */
  function showMoreTagsController($element, $timeout)  {

    let elementsMap = []
    let containerWidth = $element.width()
    this.showTags = false

    function findTags(selector = 'li') {
      return $.map($($element).find(selector), (li)=>{
        return li
      })
    }

    this.showMoreTags = () => {
      elementsMap = findTags('li.hidden')

      for (var i=0; i<elementsMap.length; i++) {
        elementsMap[i].classList.remove("hidden")
      }
      this.showTags = !this.showTags
    }

    $timeout(()=>{
      elementsMap = findTags()

      let sum = 0
      for (var i=0; i<elementsMap.length; i++) {
        sum += elementsMap[i].clientWidth

        if (sum > containerWidth) {
          elementsMap[i-1].classList.add("hidden")
        }
      }

      if (sum > (containerWidth)) {
        this.showTags = !this.showTags
      }
    })

    return this
  }

  let proSummaryTag = {
    transclude: true,
    templateUrl:    'components/pro-summary-tag/pro-summary-tag.tpl.html',
    bindings: {
      tags: '<',
      title: '@'
    },
    controller: showMoreTagsController,
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.pro-summary-tag', [
    'pascalprecht.translate'
  ])
  .component('proSummaryTag', proSummaryTag)

}())
