(function() {
  function proServiceProviderCost($q, $filter, $timeout) {

    function linkFunction(scope, element, attrs) {

      scope.required = false
      scope.error.noCost = false

      scope.model = {
        cost: ''
      }

      scope.costSummary = 'DASHBOARD.CONSULTATION_RANGE.COST_SUMMARY'
      scope.translationUrl = {
        hrefUrl: 'http://miroslawkwiatek.republika.pl/pdf_y/grawitacja_kwantowa.pdf'
      }


      scope.model.cost = parseFloat(scope.proModel.cost / 100) || ''

      const _isValid = () => {
        let _isValidDeferred = $q.defer()
        if (angular.isDefined(scope.model.cost) && scope.model.cost > 0) {
          _isValidDeferred.resolve()
        } else {
          _isValidDeferred.reject()
        }

        return _isValidDeferred.promise
      }



      const _displayErrorMessage = () => {
        scope.error.noCost = true
      }


      if ('required' in attrs) {
        scope.required = true
      }

      scope.$watch(() => {
        return scope.model.cost
      }, (newValue, oldValue) => {
        if (newValue !== undefined && typeof newValue !== 'number') {
          scope.model.cost = $filter('semicolonToCommaInputFilter')(scope.model.cost)
        }
      }, true)

      scope.saveSection = () => {
        scope.error.noCost = false
        _isValid().then(() => {

          scope.proModel.cost = scope.model.cost * 100
          scope.proceed()

        }, () => {
          _displayErrorMessage()
        })
      }


    }


    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-service-provider-cost/pro-service-provider-cost.tpl.html',
      scope: {
        queue: '=',
        order: '=?',
        proModel: '=',
        trTitle: '@',
        trDesc: '@',
        placeholder: '@',
        summaryText: '@',
        list: '=',
        errorMessage: '@'
      },
      link: linkFunction,
      controller: 'ServiceProviderStepController',
      controllerAs: 'vm'
    }
  }

  angular.module('profitelo.directives.service-provider.pro-service-provider-cost', [
    'lodash',
    'profitelo.filters.input-filter.semicolon-to-comma-input-filter',
    'pascalprecht.translate',
    'profitelo.common.controller.service-provider.service-provider-step-controller'
  ])
  .directive('proServiceProviderCost', proServiceProviderCost)
}())