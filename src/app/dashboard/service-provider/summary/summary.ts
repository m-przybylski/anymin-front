import * as angular from 'angular'
import apiModule from 'profitelo-api-ng/api.module'
import sessionModule from '../../../../common/services/session/session'
import 'common/directives/service-provider/pro-service-provider-summary-step/pro-service-provider-summary-step'
import './company/company-summary'
import './individual/individual-summary'
import 'common/directives/interface/pro-alert/pro-alert'

(function() {
  function SummaryController() {

    return this
  }

  angular.module('profitelo.controller.dashboard.service-provider.summary', [
    'ui.router',
    'profitelo.directives.service-provider.pro-service-provider-summary-step',
    sessionModule,
    apiModule,
    'profitelo.controller.dashboard.service-provider.summary.company',
    'profitelo.controller.dashboard.service-provider.summary.individual',
    'profitelo.directives.interface.pro-alert'
  ])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.dashboard.service-provider.summary', {
      abstract:     true,
      url:          '/summary',
      template:     '<div data-ui-view=""></div>',
      controller:   'SummaryController',
      controllerAs: 'vm',
      data: {
        showMenu: false
      }
    })
  })
  .controller('SummaryController', SummaryController)

}())
