function proCreateNewServiceCategory($timeout, wizardSectionControlService) {

  function linkFunction(scope, element, attrs) {

    scope.loading = true

    scope.categories = ['Podatki', 'Prawo finansowe', 'Księgowość', 'Prawo podatkowe', 'Dokumenty', 'Pomoc biurowa', 'Biuro rachunkowe', 'Inwestycje']

    scope.selectedCategory = ''
    scope.selectCategory = (category) =>{
      if (scope.selectedCategory===category) {
        scope.selectedCategory = ''
      } else {
        scope.selectedCategory = category
      }
    }


    scope.saveSection = () => {
      console.log('save section: ', parseInt(scope.order, 10))
    }

    let _isValid = () => {
      return scope.selectedCategory
    }

    let _getModel = () => {
      return scope.selectedCategory
    }

    let _setModel = (model) => {
      scope.selectedCategory = angular.copy(model)
    }

    scope.loadData = () => {
      $timeout(() => {
        scope.loading = false
      }, 1000)
    }

    scope.config = {
      order:    parseInt(scope.order, 10),
      model:    scope.selectedCategory,
      element:  element,
      queue:    scope.queue,
      save:     scope.saveSection,
      isValid:  _isValid,
      getModel: _getModel,
      setModel: _setModel,
      loadData: scope.loadData,
      toggles: {
        show:         false,
        past:         false,
        beingEdited:  false
      }
    }

    wizardSectionControlService(scope.config)


  }
  return {
    replace: true,
    templateUrl: 'directives/wizards/pro-create-new-service-category/pro-create-new-service-category.tpl.html',
    scope: {
      queue:    '=',
      order:    '@',
      service:  '='
    },
    link: linkFunction
  }
}

angular.module('profitelo.directives.wizards.pro-create-new-service-category', [
])

.directive('proCreateNewServiceCategory', proCreateNewServiceCategory)

