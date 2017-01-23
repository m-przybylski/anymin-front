(function() {

  function DashboardController() {

    return this
  }


  angular.module('profitelo.controller.dashboard', [
    'profitelo.directives.pro-top-navbar',
    'profitelo.swaggerResources',
    'ui.router',
    'ngTouch',
    'c7s.ng.userAuth'
  ])
  .config( function($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard', {
      abstract:     true,
      url:          '/dashboard',
      templateUrl:  'dashboard/dashboard.tpl.html',
      controller:   'DashboardController',
      controllerAs: 'dashboardController',
      resolve: {
        /* istanbul ignore next */
        userProfile: ($q, $state,  ProfileApi, User, topAlertService) => {
          /* istanbul ignore next */
          let _deferred = $q.defer()
          /* istanbul ignore next */
          User.getStatus().then(() => {
            ProfileApi.getProfile({
              profileId: User.getData('id')
            }).$promise.then((response) => {
              _deferred.resolve(response)
            }, () => {
              _deferred.resolve(null)
            })
          }, (error) => {
            $state.go('app.dashboard')
            topAlertService.error({
              message: 'error',
              timeout: 4
            })
          })
          /* istanbul ignore next */
          return _deferred.promise
        }
      },
      data : {
        access : UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.DASHBOARD'
      }
    })
  })
  .controller('DashboardController', DashboardController)

}())
