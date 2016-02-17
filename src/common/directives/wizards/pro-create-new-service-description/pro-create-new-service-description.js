function proCreateNewServiceDescription($timeout, wizardSectionControlService, CategoriesSubcategoriesApi) {

  function linkFunction(scope, element, attrs) {

    scope.loading = true



    scope.saveSection = () => {
      scope.serviceModel.category = scope.model.category
    }

    let _isValid = () => {
      return true
    }

    let _getModel = () => {
      return {}
    }

    let _setModel = (model) => {
    }

    let _resetModel = () => {
    }

    scope.loadData = () => {
      _resetModel()
      scope.loading = false
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
    templateUrl: 'directives/wizards/pro-create-new-service-description/pro-create-new-service-description.tpl.html',
    scope: {
      queue:    '=',
      order:    '@',
      serviceModel: '='
    },
    link: linkFunction
  }
}

angular.module('profitelo.directives.wizards.pro-create-new-service-description', [
  'profitelo.api.categories'
])

.directive('proCreateNewServiceDescription', proCreateNewServiceDescription)

