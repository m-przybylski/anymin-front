(function() {
  function proServiceProviderAvatar($q, $timeout) {

    function linkFunction(scope, element, attrs) {

      scope.required = false
      scope.badName = false

      scope.model = {
        avatar: []
      }


      let _isValid = () => {
        let _isValidDeferred = $q.defer()

        if (angular.isDefined(scope.model.avatar) && scope.model.avatar.length > 0) {
          _isValidDeferred.resolve()
        } else {
          _isValidDeferred.reject()
        }

        return _isValidDeferred.promise
      }



      let _displayErrorMessage = () => {
        scope.badName = true
        $timeout(() => {
          scope.badName = false
        }, 1000)
      }


      if ('required' in attrs) {
        scope.required = true
      }

      scope.saveSection = () => {
        _isValid().then(() => {

          scope.proceed()

        }, () => {
          _displayErrorMessage()
        })
      }
      

    }


    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-service-provider-avatar/pro-service-provider-avatar.tpl.html',
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
    'lodash',
    'pascalprecht.translate',
    'profitelo.common.controller.service-provider.service-provider-step-controller',
    'profitelo.directives.interface.pro-uploader'
  ])
  .directive('proServiceProviderAvatar', proServiceProviderAvatar)
}())
