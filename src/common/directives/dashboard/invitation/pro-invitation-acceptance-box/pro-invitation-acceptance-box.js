(function() {
  function proInvitationAcceptanceBox() {

    return {
      templateUrl: 'directives/dashboard/invitation/pro-invitation-acceptance-box/pro-invitation-acceptance-box.tpl.html',
      restrict: 'E',
      replace: true
    }
  }

  angular.module('profitelo.directives.dashboard.invitation.pro-invitation-acceptance-box', [])
    .directive('proInvitationAcceptanceBox', proInvitationAcceptanceBox)

}())
