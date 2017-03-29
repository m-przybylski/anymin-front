import * as angular from 'angular'
import * as _ from 'lodash'
import apiModule from 'profitelo-api-ng/api.module'
import {TagApi} from 'profitelo-api-ng/api/api'
import {Tag} from 'profitelo-api-ng/model/models'

interface IProServiceProviderTags extends ng.IScope {
  tags: Array<Tag>
  model: any
  searchWord: any
  onSearch: (searchWord: string) => void
  error: any
  proModel: any
  proceed: () => void
  saveSection: () => void
  required: boolean
  tagNameParam: string
}

function proServiceProviderTags($q: ng.IQService, TagApi: TagApi, ) {

  function linkFunction(scope: IProServiceProviderTags, _element: ng.IRootElementService, attrs: ng.IAttributes) {

    let required = false

    scope.tags = []

    scope.model = {
      tags: []
    }

    scope.searchWord = {}

    scope.onSearch = (searchWord: string) : void => {
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

    const _getTagsThrottled: (scope: ng.IScope) => void = _.debounce(getTagsDelayed, 200)

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
    template: require('./pro-service-provider-tags.pug')(),
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

  'pascalprecht.translate',
  'profitelo.directives.ng-enter',
  'profitelo.services.commonSettings',
  'profitelo.common.controller.service-provider.service-provider-step-controller',
  apiModule
])
  .directive('proServiceProviderTags', proServiceProviderTags)
