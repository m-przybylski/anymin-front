namespace profitelo.directives.serviceProvider.proServiceProviderTags {

  import ITagApi = profitelo.api.ITagApi
  import Tag = profitelo.api.Tag

  interface IProServiceProviderTags extends ng.IScope {
    tags: Array<Tag>
    model: any
    searchWord: any
    onSearch: Function
    error: any
    proModel: any
    proceed: Function
    saveSection: Function
    required: boolean
    tagNameParam: string
  }

  function proServiceProviderTags($q: ng.IQService, TagApi: ITagApi, lodash: _.LoDashStatic) {

    function linkFunction(scope: IProServiceProviderTags, _element: ng.IRootElementService, attrs: ng.IAttributes) {

      let required = false

      scope.tags = []

      scope.model = {
        tags: []
      }

      scope.searchWord = {}

      scope.onSearch = (searchWord: string) => {
        scope.searchWord = searchWord
      }

      const _getTags = (searchWord: string) => {
        if (searchWord.length >= 3) {
          TagApi.postTagSuggestRoute({
            query: searchWord,
            tags: scope.tags
          }).then((res) => {
            const tags = res.tags
            scope.tags = JSON.parse(angular.toJson(tags))
          })
        } else {
          scope.tags = []
        }
      }

      const getTagsDelayed = () =>
        scope.$apply(() => _getTags(scope.searchWord))

      const _getTagsThrottled: Function = lodash.debounce(getTagsDelayed, 200)

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
    'ngLodash',
    'pascalprecht.translate',
    'profitelo.directives.ng-enter',
    'profitelo.services.commonSettings',
    'profitelo.common.controller.service-provider.service-provider-step-controller',
    'profitelo.api.TagApi'
  ])
    .directive('proServiceProviderTags', proServiceProviderTags)
}
