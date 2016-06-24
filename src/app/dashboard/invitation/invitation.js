(function () {

  function InvitationController() {

    this.profile = {
      name: 'Jakaś firma',
      description: 'Some description',
      logo: '/assets/images/John_Doe.jpg'
    }
    
    return this
  }

  function config($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.invitation', {
      url: '/invitations',
      controllerAs: 'vm',
      controller: 'InvitationController',
      templateUrl: 'dashboard/invitation/invitation.tpl.html',
      data: {
        access: UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.LOGIN.ACCOUNT'
      }
    })
  }


  angular.module('profitelo.controller.dashboard.invitation', [
    'ui.router',
    'c7s.ng.userAuth',
    'ui.router',
    'profitelo.swaggerResources',

    'profitelo.directives.pro-top-alert-service',
    'profitelo.directives.ng-enter',
    'profitelo.directives.interface.pro-alert',
    'profitelo.directives.service-provider.pro-service-provider-profile'

  ])
    .config(config)
    .controller('InvitationController', InvitationController)

}())
