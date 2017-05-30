import * as angular from 'angular'
import {CommonSettingsService} from '../../../services/common-settings/common-settings.service'
import checkboxModule from '../../../components/interface/checkbox/checkbox'

interface IProServiceProviderWhoProvides extends ng.IScope {
  required: boolean
  error: any
  emails: Array<any>
  model: any
  emailPattern: string
  ownerEmployee: boolean
  proModel: any
  tagParam: string
  saveSection: () => void
  proceed: () => void
}

function proServiceProviderWhoProvides($q: ng.IQService, CommonSettingsService: CommonSettingsService) {
  function linkFunction(scope: IProServiceProviderWhoProvides, element: JQuery, attrs: ng.IAttributes) {
    scope.required = false
    scope.error.badEmployee = false

    scope.emails = [
      {email: 'bartek@itelo.pl'},
      {email: 'pawel@itelo.pl'},
      {email: 'mikolaj@itelo.pl'},
      {email: 'grazyna@itelo.pl'}
    ]

    scope.model = {
      invitations: []
    }

    scope.emailPattern = CommonSettingsService.localSettings.emailPattern

    scope.ownerEmployee = angular.isDefined(scope.ownerEmployee) ? scope.ownerEmployee : false

    if (angular.isDefined(scope.proModel.invitations) && scope.proModel.invitations.length > 0) {
      scope.model.invitations = scope.proModel.invitations
    }

    element.bind('keydown keypress', function (event) {
      if (event.which === 13) {
        event.preventDefault()
        scope.saveSection()
      }
    })

    const _isValid = () => {
      const _isValidDeferred = $q.defer()

      if (angular.isDefined(scope.model.invitations) && scope.model.invitations.length > 0) {
        _isValidDeferred.resolve()
      } else {
        _isValidDeferred.reject()
      }

      return _isValidDeferred.promise
    }

    const _displayErrorMessage = () => {
      scope.error.badEmployee = true
    }

    scope.tagParam = 'email'

    if ('required' in attrs) {
      scope.required = true
    }

    scope.saveSection = () => {
      _isValid().then(() => {
        scope.error.badEmployee = false
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
    template: require('./pro-service-provider-who-provides.pug')(),
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

  'profitelo.services.commonSettings',
  'pascalprecht.translate',
  'profitelo.common.controller.service-provider.service-provider-step-controller',
  checkboxModule
])
  .directive('proServiceProviderWhoProvides', proServiceProviderWhoProvides)
