function proCreateNewServiceName($timeout, $q, wizardSectionControlService) {

  function linkFunction(scope, element, attrs) {

    scope.model = {
      serviceName: ''
    }

    scope.saveSection = () => {
      console.log('save section: ', parseInt(scope.order, 10))
    }

    let _isValid = () => {
      return angular.isDefined(scope.model.serviceName) && scope.model.serviceName.length > 0
    }

    let _getModel = () => {
      return scope.model
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
    templateUrl: 'directives/wizards/pro-create-new-service-name/pro-create-new-service-name.tpl.html',
    scope: {
      queue:    '=',
      order:    '@',
      service:  '='
    },
    link: linkFunction
  }
}

angular.module('profitelo.directives.wizards.pro-create-new-service-name', [
  'ngAnimate',
  'toastr',  // some parts depends on ngAnimate
  'lodash',

  // internal scripts
  'profitelo.api.profiles',
  'profitelo.services.wizardSectionControl'
])

  .directive('proCreateNewServiceName', proCreateNewServiceName)