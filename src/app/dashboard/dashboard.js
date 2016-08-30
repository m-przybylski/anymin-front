(function() {

  function DashboardController($rootScope, $scope, $state, $window, userProfile) {

    this.isSidebarOpen = false
    this.switchUser = false
    this.expertProfileExist = !!userProfile.expertDetails
    this.isNavbarShown = true
    this.isSidebarShown = true

    this.changeAccount = function() {
      this.switchUser = !this.switchUser
    }

    let _sidebar = $('.dashboard-left-menu')
    _sidebar.perfectScrollbar()

    this.toogleSidebar=function() {
      this.isSidebarOpen = !this.isSidebarOpen
    }

    this.showSidebar = ()=> {
      this.isSidebarShown = this.isSidebarShown === false
    }
    
    /* istanbul ignore next */
    angular.element($window).on('resize', (window)=> {
      if ($window.innerWidth < 992) {
        this.isSidebarShown = false
      } else {
        this.isSidebarShown = true
        $scope.$digest()
      }
    })

    const _checkSidebarVisibility = (toState) => {
      if (angular.isUndefined(toState.data.showMenu)) {
        this.isSidebarShown = true
        this.isNavbarShown = true
      } else {
        this.isSidebarShown = toState.data.showMenu
        this.isNavbarShown = toState.data.showTopMenu
      }
    }

    $rootScope.$on('$stateChangeSuccess', (event, toState) => {
      _checkSidebarVisibility(toState)
    })

    _checkSidebarVisibility($state.current)
    this.toggleChat = () => {
      
      $rootScope.$broadcast('toggleChat')
    }
    return this
  }


  angular.module('profitelo.controller.dashboard', [
    'profitelo.directives.dashboard.dashboard-left-menu',
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
        userProfile: ($q, $state,  ProfileApi, User) => {
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
            proTopAlertService.error({
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
