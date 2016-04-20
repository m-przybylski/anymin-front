/* istanbul ignore next */
(function() {
  function proCreateNewServiceIndustry($rootScope, wizardSectionControlService, CategoriesApi) {

    function linkFunction(scope, element, attrs) {
      scope.industries = []

      scope.loading = true

      scope.model = {
        industry: ''
      }

      scope.isSelected = (industry) => {
        return scope.model.industry === industry ? 'industry-box-selected' : ''
      }

      scope.saveSection = () => {
        console.log('save section: ', parseInt(scope.order, 10))
        scope.serviceModel.industry = scope.model.industry
        $rootScope.$broadcast('industrySectionChanged')

      }

      let _isValid = () => {
        return scope.model.industry !== ''
      }

      let _getModel = () => {
        return scope.model
      }

      let _setModel = (model) => {
        scope.model = angular.copy(model)
      }

      scope.loadData = () => {
        CategoriesApi.get().$promise.then((data) => {
          scope.industries = data
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
      replace:        true,
      templateUrl:    'directives/wizards/pro-create-new-service-industry/pro-create-new-service-industry.tpl.html',
      scope: {
        queue:    '=',
        order:    '@',
        serviceModel: '='
      },
      link: linkFunction
    }

  }

  angular.module('profitelo.directives.wizards.pro-create-new-service-industry', [])
  .directive('proCreateNewServiceIndustry', proCreateNewServiceIndustry)


}())