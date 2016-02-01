function proCreateNewServiceCategory($timeout, wizardSectionControlService, CategoriesApi) {

  function linkFunction(scope, element, attrs) {

    scope.loading = true

    scope.categories = []

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
      CategoriesApi.get().$promise.then((data) => {
        scope.categories = data
        scope.loading = false
      })
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
  'profitelo.api.categories'
])

.directive('proCreateNewServiceCategory', proCreateNewServiceCategory)

