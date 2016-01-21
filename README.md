# Profitelo Frontend [![Built with Gulp][build-with-gulp-png]][gulpjs-page]

## Intallation

    npm install
    gulp serve

## Writing rules

### Catalogs, filenames
1. All catalogs and filenames we will write with `lisp-case` or `train-case` (<http://stackoverflow.com/a/17820138/1977012>)

### Controllers
1.  Controllers should have separate function for .controller method
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
1. Controller for directive should be passed as function.
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
### Testing directives
1.  Firstly, you need to create html string element with your directive.
    Function create should be used to compile directive, after that
    you can call all controller methods via isolatedScope().
    All API calls should be defined as variables, it let you
    to smoothly switch between response 200 and response 400(or any other) - check example test!
    ```
    describe('Unit testing: profitelo.directive.pro-registration', () => {
      return describe('for pro-registration directive >', () => {

        var compile                 = null
        var scope                   = null
        var _$httpBackend           = null
        var _$state                 = null
        var _CommonSettingsService  = null
        var validHTML = '<div data-pro-registration data-step1="step1"></div>'

        var registrationPOST = null
        var registrationGET  = null

        beforeEach(() => {
          module('templates-module')
          module('profitelo.directives.pro-registration')

          inject(($rootScope, $compile, _$httpBackend_, _$state_, CommonSettingsService) => {
            scope         = $rootScope.$new()
            compile       = $compile
            scope.step1   = true
            _$state       = _$state_
            _$httpBackend = _$httpBackend_
            _CommonSettingsService = CommonSettingsService


            $rootScope.registrationFooterData = {}


          })
          _$state.current.name = 'app.registration'

          registrationGET  = _$httpBackend.when('GET', _CommonSettingsService.get('apiUrl')+'/registration')
          .respond(200, {})

          registrationPOST =_$httpBackend.when('POST', _CommonSettingsService.get('apiUrl')+'/registration')
          .respond(200, {})


        })

        function create(html) {
          var elem = angular.element(html)
          var compiledElement = compile(elem)(scope)
          scope.$digest()
          return compiledElement
        }

        it('should not redirect while its first step', () => {
          var el
          el = create(validHTML)
          expect(el.isolateScope().vm.registrationMetaData.step1).toEqual(true)
        })

        it('should send email', () =>{
          var el
          el = create(validHTML)
          el.isolateScope().vm.sendEmail()
          _$httpBackend.flush()
          expect(el.isolateScope().vm.registrationMetaData.emailSended).toEqual(true)
        })

        it('should redirect to home if token is wrong', () => {
              spyOn(_$state, 'go')

              registrationGET.respond(400, {})
              scope.step1 = false
              var el
              el = create(validHTML)
              _$httpBackend.flush()
              expect(_$state.go).toHaveBeenCalledWith('app.home')
              expect(el.isolateScope().vm.registrationMetaData.step1).toEqual(false)

        })

      })
    })
    ```



### Angular elements

1. All directives will be named with `pro` prefix (from Profitelo) in its name
2. 


[gulpjs-page]: https://www.gulpjs.com
[build-with-gulp-png]: https://raw.githubusercontent.com/gulpjs/gulp/e2dd2b6c66409f59082c24585c6989244793d132/built-with-gulp.png



