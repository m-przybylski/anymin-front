(function () {

  const companyProfile = {
    transclude: true,
    template: require('./company-profile.pug')(),
    bindings: {
      profile: '<'
    },
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.invitations.company-profile', [
    'pascalprecht.translate'
  ])
    .component('companyProfile', companyProfile)

}())
