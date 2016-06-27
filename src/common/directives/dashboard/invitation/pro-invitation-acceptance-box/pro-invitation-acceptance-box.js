(function() {
  function proInvitationAcceptanceBox() {

    return {
      templateUrl: 'directives/dashboard/invitation/pro-invitation-acceptance-box/pro-invitation-acceptance-box.tpl.html',
      restrict: 'E',
      replace: true,
      scope: {
        invitation: '='
      }
    }
  }

  angular.module('profitelo.directives.dashboard.invitation.pro-invitation-acceptance-box', [
    'profitelo.components.pro-summary-tag',
    'profitelo.directives.interface.pro-input'
  ])
    .directive('proInvitationAcceptanceBox', proInvitationAcceptanceBox)

}())
