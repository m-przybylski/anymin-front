(function() {
  function proServiceProviderDescription(wizardSectionControlService) {

    function linkFunction(scope, element, attrs) {

      scope.model = {
        description: ''
      }

      scope.loading = true
      
      scope.saveSection = () => {
        scope.proModel.description = scope.model.description
      }


      let _isValid = () => {
        return angular.isDefined(scope.model.description) && scope.model.description.length > 0
      }

      let _getModel = () => {
        return scope.model
      }

      let _setModel = (model) => {
        scope.model = angular.copy(model)
      }

      scope.loadData = () => {
        scope.loading = false
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
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-service-provider-description/pro-service-provider-description.tpl.html',
      scope: {
        queue:    '=',
        order:    '@',
        proModel: '=',
        steps: '@',
        trTitle: '@',
        trDesc: '@'
      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.service-provider.pro-service-provider-description', [
    'lodash',
    'pascalprecht.translate',
    'profitelo.services.wizardSectionControl'
  ])
  .directive('proServiceProviderDescription', proServiceProviderDescription)
}())