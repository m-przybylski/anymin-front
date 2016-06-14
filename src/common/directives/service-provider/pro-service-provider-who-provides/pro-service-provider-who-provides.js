(function() {
  function proServiceProviderWhoProvides($q, $timeout) {
    function linkFunction(scope, element, attrs) {
      scope.required = false
      scope.badName = false

      scope.emails = ['bartek@itelo.pl', 'pawel@itelo.pl', 'mikolaj@itelo.pl', 'grazyna@itelo.pl']


      scope.model = {
        invitations: []
      }

      element.bind('keydown keypress', function(event) {
        if (event.which === 13) {
          event.preventDefault()
          scope.saveSection()
        }
      })

      let _isValid = () => {
        let _isValidDeferred = $q.defer()

        if (angular.isDefined(scope.model.invitations) && scope.model.invitations.length > 0) {
          _isValidDeferred.resolve()
        } else {
          _isValidDeferred.reject()
        }

        return _isValidDeferred.promise
      }

      let _displayErrorMessage = () => {
        scope.bad= true
      }

      if ('required' in attrs) {
        scope.required = true
      }

      scope.saveSection = () => {
        _isValid().then(() => {
          scope.badName = false
          // TODO jak bedzie backedn
          //  if (scope.checkCurrentUser === true) {
          //
          //  }
          scope.proModel.invitations = scope.model.invitations
          scope.proceed()

        }, () => {
          _displayErrorMessage()
        })
      }


    }


    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'directives/service-provider/pro-service-provider-who-provides/pro-service-provider-who-provides.tpl.html',
      scope: {
        queue: '=',
        order: '=?',
        proModel: '=',
        trTitle: '@',
        trDesc: '@',
        placeholder: '@',
        errorMessage: '@',
        label: '@'
      },
      link: linkFunction,
      controller: 'ServiceProviderStepController',
      controllerAs: 'vm'
    }
  }

  angular.module('profitelo.directives.service-provider.pro-service-provider-who-provides', [
    'lodash',
    'pascalprecht.translate',
    'profitelo.common.controller.service-provider.service-provider-step-controller'
  ])
  .directive('proServiceProviderWhoProvides', proServiceProviderWhoProvides)
}())
