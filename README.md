# Profitelo Frontend [![Built with Gulp][build-with-gulp-png]][gulpjs-page]

## Intallation

    npm install
    gulp serve

## Writing rules

### Catalogs, filenames
1. All catalogs and filenames we will write with `lisp-case` or `train-case` (<http://stackoverflow.com/a/17820138/1977012>)

### Controllers
1.  Controllers should have separated function for .controller method
2.  Controllers should be passed as string to $stateProvider

    Example controller:
    ```
    angular.module('profitelo.controller.dashboard', [
      'ui.router'
    ])
    .config(($stateProvider) =>{
      $stateProvider.state('app.dashboard', {
        controllerAs: 'vm',
        abstract: true,
        url: '/dashboard',
        templateUrl: 'dashboard/dashboard.tpl.html',
        controller: 'DashboardController'
      })
    })
    .controller('DashboardController', DashboardController)
    function DashboardController() {
      var vm = this
      return vm
    }
    ```


### Directives
1. Controller for directive should be passed as function
    Example directive:
    ```
    function proRegistration($scope) {
      var vm = this
      return vm
    }
    angular.module('profitelo.directives.pro-registration', [
      'ui.router',
    ])
    .directive('proRegistration', () =>{
      return {
        templateUrl:  'directives/pro-registration/pro-registration.tpl.html',
        restrict:     'A',
        controller:   proRegistration,
        controllerAs: 'vm',
        scope:        {step1:'='},
        replace:      true
      }
    })

    ```
### Angular elements

1. All directives will be named with `pro` prefix (from Profitelo) in its name
2. 


[gulpjs-page]: https://www.gulpjs.com
[build-with-gulp-png]: https://raw.githubusercontent.com/gulpjs/gulp/e2dd2b6c66409f59082c24585c6989244793d132/built-with-gulp.png



