angular.module('profitelo.controller.dashboard', ['ui.router']).config(function($stateProvider) {
    var access;
    access = routingConfig.accessLevels;
    return $stateProvider.state('dashboard', {
        abstract: true,
        parent: 'app',
        url: '/dashboard',
        templateUrl: 'dashboard/dashboard.tpl.html',
        controller: 'DashboardController',
        ncyBreadcrumb: {
            label: 'PAGE.TITLE.DASHBOARD'
        },
        data: {
            access: access.user,
            showSearch: true
        }
    });
}).controller('DashboardController', function($scope, PagetitleService, UserService) {
    PagetitleService.setTitle('PAGE.TITLE.DASHBOARD');
    $scope.accountId = UserService.getData('account_id');
});
