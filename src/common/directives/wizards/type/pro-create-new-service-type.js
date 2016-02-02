function proCreateNewServiceType($timeout, wizardSectionControlService) {

  function linkFunction(scope, element, attrs) {
    scope.loading = true

    scope.updateModel = (type) =>{
      scope.model.type = type
    }
    scope.model = {
      type: ''
    }
    angular.forEach(scope.tags, (value, key) =>{
      scope.model.tagMap[value] = false
    })

    scope.saveSection = () => {
      console.log('save section: ', parseInt(scope.order, 10))
    }

    let _isValid = () => {
      return scope.model.type!==''
    }

    let _getModel = () => {
      return scope.model
    }

    scope.loadData = () => {
      $timeout(() => {
        scope.loading = false
      }, 1000)
    }

    let _setModel = (model) => {
      scope.model = angular.copy(model)
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
    console.log(scope.config)
    wizardSectionControlService(scope.config)

  }
  return {
    replace:        true,
    templateUrl:    'directives/wizards/type/pro-create-new-service-type.tpl.html',
    scope: {
      userProfile:  '=',
      queue:    '=',
      order:    '@',
      service:  '='
    },
    link: linkFunction
  }

}

angular.module('profitelo.directives.wizards.pro-create-new-service-type', [
])

.directive('proCreateNewServiceType', proCreateNewServiceType)

