(function() {
  function proServiceProviderWhoProvides($q, $timeout, CommonSettingsService) {
    function linkFunction(scope, element, attrs) {
      scope.required = false
      scope.badEmployee = false

      scope.emails = [
          {email: 'bartek@itelo.pl'},
          {email:'pawel@itelo.pl'},
          {email:'mikolaj@itelo.pl'},
          {email:'grazyna@itelo.pl'}
      ]

      scope.model = {
        invitations: []
      }

      scope.emailPattern = CommonSettingsService.localSettings.emailPattern

      scope.ownerEmployee = angular.isDefined(scope.ownerEmployee) ? scope.ownerEmployee : false

      if (angular.isDefined(scope.proModel.invitations) && scope.proModel.invitations.length > 0) {
        scope.model.invitations = scope.proModel.invitations
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

      scope.tagParam = 'email'


      if ('required' in attrs) {
        scope.required = true
      }

      scope.saveSection = () => {
        _isValid().then(() => {
          scope.badEmployee = false
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
        ownerEmployee: '=?',
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
    'profitelo.services.commonSettings',
    'pascalprecht.translate',
    'profitelo.common.controller.service-provider.service-provider-step-controller'
  ])
  .directive('proServiceProviderWhoProvides', proServiceProviderWhoProvides)
}())
