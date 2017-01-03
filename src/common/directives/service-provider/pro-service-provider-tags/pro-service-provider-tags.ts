(function() {
  function proServiceProviderTags($q, $timeout, TagApi) {

    function linkFunction(scope, element, attrs) {

      let required = false

      scope.tags = []

      scope.model = {
        tags: []
      }

      scope.searchWord = {}

      scope.onSearch = (searchWord) => {
        scope.searchWord = searchWord
      }

      const _getTags = (searchWord) => {
        if (searchWord.length >= 3) {
          TagApi.postTagSuggest({
            query: searchWord,
            tags: scope.tags
          }).$promise.then((res) => {
            scope.tags = JSON.parse(angular.toJson(res.tags))
          })
        } else {
          scope.tags = []
        }
      }

      const getTagsDelayed = () =>
        scope.$apply(() => _getTags(scope.searchWord))

      const _getTagsThrottled = _.debounce<any>(getTagsDelayed, 200)

      scope.$watch('searchWord', () => _getTagsThrottled(scope))

      if (scope.proModel.tags.length > 0) {
        scope.model.tags = scope.proModel.tags
      }

      scope.tagNameParam = 'name'

      if ('required' in attrs) {
        required = true
      }

      const _isValid = () => {
        const _isValidDeferred = $q.defer()

        if (angular.isDefined(scope.model.tags) && scope.model.tags.length > 0) {
          _isValidDeferred.resolve()
        } else {
          _isValidDeferred.reject()
        }

        return _isValidDeferred.promise
      }

      const _displayErrorMessage = () => {
        scope.error.noTags = true
      }

      scope.saveSection = () => {
        scope.error.noTags = false
        _isValid().then(() => {
          scope.proModel.tags = scope.model.tags
          scope.proceed()
        }, () => {
          _displayErrorMessage()
        })
      }

      if ('required' in attrs) {
        scope.required = true
      }
    }


    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-service-provider-tags/pro-service-provider-tags.tpl.html',
      scope: {
        queue: '=',
        order: '=?',
        proModel: '=',
        trTitle: '@',
        trDesc: '@',
        placeholder: '@',
        errorMessage: '@'
      },
      link: linkFunction,
      controller: 'ServiceProviderStepController',
      controllerAs: 'vm'
    }
  }

  angular.module('profitelo.directives.service-provider.pro-service-provider-tags', [
    'lodash',
    'pascalprecht.translate',
    'profitelo.directives.ng-enter',
    'profitelo.services.commonSettings',
    'profitelo.common.controller.service-provider.service-provider-step-controller',
    'profitelo.swaggerResources'
  ])
    .directive('proServiceProviderTags', proServiceProviderTags)
}())
