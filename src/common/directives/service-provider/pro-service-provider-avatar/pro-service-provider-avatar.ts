import * as angular from "angular"
import {TopAlertService} from "../../../services/top-alert/top-alert.service"
import {FilesApi} from "profitelo-api-ng/api/api"
import topAlertModule from "../../../services/top-alert/top-alert"

interface Attributes extends ng.IAttributes {
  imageField?: string
}

function proServiceProviderAvatar($log: ng.ILogService, $q: ng.IQService, topAlertService: TopAlertService,
                                  FilesApi: FilesApi) {

  function linkFunction(scope: any, _element: ng.IRootElementService, attrs: Attributes) {

    scope.imageField = 'avatar'
    scope.required = false
    scope.isPending = false

    scope.imageSizeValidation = {
      width: {
        min: 120,
        max: 4000
      },
      height: {
        min: 120,
        max: 4000
      }
    }
    if ('imageField' in attrs) {
      scope.imageField = attrs.imageField
    }
    scope.model = {}
    scope.model[scope.imageField] = []

    let _getImageIfExist = (model: any) => {
      FilesApi.fileInfoPath(model).then((res) => {
        scope.model[scope.imageField].push({file: null, response: res})
        scope.isPending = false
      }, (err: any) => {
        $log.error(err)
        topAlertService.error({
          message: 'error',
          timeout: 4
        })
      })
    }

    !!scope.proModel[scope.imageField] ? _getImageIfExist(scope.proModel[scope.imageField]) : scope.model[scope.imageField] = []

    let _isValid = () => {
      let _isValidDeferred = $q.defer()
      if (angular.isDefined(scope.model[scope.imageField]) && scope.model[scope.imageField].length > 0 && !scope.isPending) {
        _isValidDeferred.resolve(scope.model[scope.imageField][0].response.token)
      } else {
        _isValidDeferred.reject()
      }

      return _isValidDeferred.promise
    }

    let _displayErrorMessage = () => {
      scope.error.noFile = true
    }

    if ('required' in attrs) {
      scope.required = true
    }

    scope.removeAvatar = () => {
      scope.error.noFile = true
      scope.model[scope.imageField].splice(0, 1)
    }

    scope.saveSection = () => {
      _isValid().then((avatarId) => {
        scope.error.noFile = false
        scope.proModel[scope.imageField] = avatarId
        scope.proceed()
      }, () => {
        _displayErrorMessage()
      })
    }


  }


  return {
    replace: true,
    restrict: 'E',
    template: require('./pro-service-provider-avatar.jade')(),
    scope: {
      queue: '=',
      order: '=?',
      proModel: '=',
      trTitle: '@',
      trDesc: '@',
      placeholder: '@'
    },
    link: linkFunction,
    controller: 'ServiceProviderStepController',
    controllerAs: 'vm'
  }
}

angular.module('profitelo.directives.service-provider.pro-service-provider-avatar', [
  'ngLodash',
  'pascalprecht.translate',
  'profitelo.common.controller.service-provider.service-provider-step-controller',
  'profitelo.directives.interface.pro-uploader',
  topAlertModule
])
  .directive('proServiceProviderAvatar', proServiceProviderAvatar)
