function proCreateNewServiceCategory($timeout, wizardSectionControlService, CategoriesSubcategoriesApi) {

  function linkFunction(scope, element, attrs) {

    scope.loading = true

    let _hadBeenLoaded = false

    scope.categories = []

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

    let _resetModel = () => {
      scope.model = {
        category: null
      }
      if (_hadBeenLoaded) {
        scope.serviceModel.category = scope.model.category
      }
    }

    scope.loadData = () => {
      _resetModel()
      CategoriesSubcategoriesApi.get({id: scope.serviceModel.industry.id}).$promise.then((data) => {
        scope.categories = data
        scope.loading = false
        _hadBeenLoaded = true
      })
    }



    scope.$on('industrySectionChanged', () => {
      if (_hadBeenLoaded) {
        scope.loadData()
      }
    })

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

