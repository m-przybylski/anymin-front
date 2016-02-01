function proCreateNewServiceCategory($timeout, wizardSectionControlService, CategoriesApi) {

  function linkFunction(scope, element, attrs) {

    scope.loading = true

    scope.categories = []

    scope.model = {
      category: null
    }


    scope.saveSection = () => {
      console.log('save section: ', parseInt(scope.order, 10))
      scope.serviceModel.category = scope.model.category
    }

    let _isValid = () => {
      return scope.model.category !== null
    }

    let _getModel = () => {
      return scope.model
    }

    let _setModel = (model) => {
      scope.model = angular.copy(model)
    }

    scope.loadData = () => {
      CategoriesApi.get().$promise.then((data) => {
        scope.categories = data
        scope.loading = false
      })
    }

    scope.config = {
      order:    parseInt(scope.order, 10),
      model:    scope.model,
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
      serviceModel: '='
    },
    link: linkFunction
  }
}

angular.module('profitelo.directives.wizards.pro-create-new-service-category', [
  'profitelo.api.categories'
])

.directive('proCreateNewServiceCategory', proCreateNewServiceCategory)

