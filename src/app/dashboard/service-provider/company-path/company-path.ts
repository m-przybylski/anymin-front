namespace profitelo.dashboard.serviceProvider.companyPath {

  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import ISmoothScrollingService = profitelo.services.smoothScrolling.ISmoothScrollingService
  import IProfileApi = profitelo.api.IProfileApi
  import UpdateProfile = profitelo.api.UpdateProfile
  import GetProfile = profitelo.api.GetProfile

  function CompanyPathController($scope: ng.IScope, $state: ng.ui.IStateService, ProfileApi: IProfileApi,
                                 savedProfile: GetProfile | null, topAlertService: ITopAlertService,
                                 $timeout: ng.ITimeoutService, smoothScrollingService: ISmoothScrollingService) {

    let _updateMethod: (body: UpdateProfile) => any
    if (savedProfile) {
      _updateMethod = ProfileApi.patchProfileRoute
    } else {
      _updateMethod = ProfileApi.postProfileRoute
    }

    this.companyPathModel = {
      name: '',
      logo: null,
      description: '',
      files: [],
      links: []
    }

    this.queue = {
      amountOfSteps: 6,
      currentStep: 2,
      completedSteps: 1,
      skippedSteps: {}
    }

    if (savedProfile && savedProfile.organizationDetails) {
      this.companyPathModel = savedProfile.organizationDetails
      this.queue = {
        amountOfSteps: 6,
        currentStep: 7,
        completedSteps: 6,
        skippedSteps: {}
      }
      this.inEditMode = true
    } else {
      this.inEditMode = false
      $timeout(()=> {
        smoothScrollingService.scrollTo(this.queue.currentStep)
      })
    }

    let _calculateProgressPercentage = () => {
      this.progressBarWidth = Math.ceil(this.queue.completedSteps / this.queue.amountOfSteps * 100)
    }
    _calculateProgressPercentage()

    $scope.$watch(() => {
      return this.queue.completedSteps
    }, _calculateProgressPercentage)

    this.saveAccountObject = () => {
      _updateMethod({
        organizationDetails: {
          name: this.companyPathModel.name,
          logo: this.companyPathModel.logo,
          description: this.companyPathModel.description,
          files: this.companyPathModel.files.map((file: any) => {
            return {token: file.token, previews: file.previews}
          }),
          links: this.companyPathModel.links
        }
      }).then(() => {
        $state.go('app.dashboard.service-provider.consultation-range.company')
      }, () => {
        topAlertService.error({
          message: 'error',
          timeout: 4
        })
      })
    }


    return this
  }


  angular.module('profitelo.controller.dashboard.service-provider.company-path', [
    'ui.router',
    'profitelo.directives.service-provider.pro-service-provider-name',
    'profitelo.directives.service-provider.pro-service-provider-description',
    'profitelo.directives.service-provider.pro-service-provider-languages',
    'profitelo.directives.service-provider.pro-bottom-summary-row',
    'profitelo.api.ProfileApi',
    'profitelo.directives.service-provider.pro-service-provider-avatar',
    'profitelo.services.top-alert',
    'c7s.ng.userAuth'
  ])
    .config(function($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) {
      $stateProvider.state('app.dashboard.service-provider.company-path', {
        url: '/company-path',
        templateUrl: 'dashboard/service-provider/company-path/company-path.tpl.html',
        controller: 'CompanyPathController',
        controllerAs: 'vm',
        resolve: {
          savedProfile: ($log: ng.ILogService, $q: ng.IQService, $state: ng.ui.IStateService, ProfileApi: IProfileApi,
                         User: any, topAlertService: ITopAlertService) => {
            /* istanbul ignore next */
            let _deferred = $q.defer<GetProfile | null>()
            /* istanbul ignore next */
            User.getStatus().then(() => {
              ProfileApi.getProfileRoute(User.getData('accountId')).then((response) => {
                _deferred.resolve(response)
              }, () => {
                _deferred.resolve(null)
              })
            }, (error: any) => {
              $log.error(error)
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
        data: {
          access: UserRolesProvider.getAccessLevel('user'),
          pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.COMPANY_PATH',
          showMenu: false
        }
      })
    })
    .controller('CompanyPathController', CompanyPathController)
}
