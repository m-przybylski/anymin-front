(function() {

  let companyProfile = {
    transclude: true,
    templateUrl:    'components/invitations/company-profile.tpl.html',
    bindings: {
      profile: '<',
      avatar: '<'
    },
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.invitations.company-profile', [
    'pascalprecht.translate'
  ])
    .component('companyProfile', companyProfile)

}())