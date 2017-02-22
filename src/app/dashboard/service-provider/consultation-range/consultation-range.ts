(function() {
  function ConsultationRangeController() {


    return this

  }
  angular.module('profitelo.controller.dashboard.service-provider.consultation-range', [
    'ui.router',
    'profitelo.directives.service-provider.pro-bottom-summary-row',
    'profitelo.directives.service-provider.pro-service-provider-cost',
    'profitelo.directives.service-provider.pro-service-provider-who-provides',
    'profitelo.directives.service-provider.pro-service-provider-tags',
    'profitelo.directives.service-provider.pro-bottom-consultation-button',
    'c7s.ng.userAuth',
    'profitelo.directives.interface.pro-alert',
    'profitelo.directives.service-provider.pro-service-provider-profile'
  ])
  .config( function($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) {
    $stateProvider.state('app.dashboard.service-provider.consultation-range', {
      abstract:     true,
      url:          '/consultation-range',
      template:     '<div data-ui-view=""></div>',
      controller:   'ConsultationRangeController',
      controllerAs: 'ConsultationRangeController',
      data: {
        access : UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.CONSULTATION_RANGE',
        showMenu: false
      }
    })
  })
  .controller('ConsultationRangeController', ConsultationRangeController)

}())
