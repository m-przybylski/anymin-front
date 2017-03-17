import * as angular from 'angular'
import {Tag} from 'profitelo-api-ng/model/models'
import filtersModule from '../../../filters/filters'
import
  'common/controllers/service-provider/pro-service-provider-summary-controller/pro-service-provider-summary-controller'
import 'common/controllers/service-provider/service-provider-step-controller/service-provider-step-controller'
import 'common/components/pro-summary-tag/pro-summary-tag'

function proServiceProviderSummaryStep() {

  /* istanbul ignore next function -  We'll need to load babel-polyfill to test it*/
  function preCompileFunction(scope: any) {
    for (let consultation of scope.consultations) {
      if (consultation.invitations.length > 0) {
        consultation.invitationTags = consultation.invitations.map((invitation: any) => {
          return invitation.email
        })
      }
      consultation.details.tagNames = consultation.details.tags.map((tag: Tag) => tag.name)
    }
  }

  function compileFunction() {
    return {
      pre: preCompileFunction
    }
  }

  return {
    replace: true,
    restrict: 'E',
    template: require('./pro-service-provider-summary-step.pug')(),
    compile: compileFunction,
    scope: {
      consultations: '=',
      editAction: '=',
      deleteAction: '='
    },
    controller: 'ProServiceProviderSummaryController',
    controllerAs: 'vm'
  }
}

angular.module('profitelo.directives.service-provider.pro-service-provider-summary-step', [

  'pascalprecht.translate',
  filtersModule,
  'profitelo.common.controller.service-provider.pro-service-provider-summary-controller',
  'profitelo.common.controller.service-provider.service-provider-step-controller',
  'profitelo.components.pro-summary-tag'
])
  .directive('proServiceProviderSummaryStep', proServiceProviderSummaryStep)
