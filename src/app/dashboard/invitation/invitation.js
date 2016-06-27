(function() {

  function InvitationController() {

    this.profile = {
      name: 'Jakaś firma',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.',
      logo: '/assets/images/John_Doe.jpg',
      invitations: [
        {
          icon: '',
          industry: 'Biznes > Metody zarządzania firmą',
          tags: [
            'Biznesplan',
            'Małe firmy',
            'Srednie firmy'
          ]
        },
        {
          icon: '',
          industry: 'Prawo > Prawo Rodzinne',
          tags: [
            'Rozwody',
            'Alimenty',
            'Spadki i darowizny'
          ]
        }
      ]

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
    'c7s.ng.userAuth',
    'ui.router',
    'profitelo.swaggerResources',

    'profitelo.directives.dashboard.invitation.pro-invitation-acceptance-box'

  ])
    .config(config)
    .controller('InvitationController', InvitationController)

}())
