(function() {
  function ConsultationRangeController($scope, $state, savedProfile, ServiceApi, proTopAlertService) {

    this.costModel = {
      name: '',
      tags: [],
      cost: ''
    }

    this.editModel = {
      name: '',
      tags: [],
      cost: 0
    }

    this.queue = {
      amountOfSteps: 3,
      currentStep: 1,
      completedSteps: 0,
      skippedSteps: {}
    }

    this.editQueue = {
      amountOfSteps: 3,
      currentStep: 4,
      completedSteps: 3,
      skippedSteps: {}
    }

    this.currency = [
      {id: 1, name: 'PLN'},
      {id: 2, name: 'USD'},
      {id: 3, name: 'EUR'}
    ]

    this.consultations = []
    this.profile = {}
    let isExpert = false

    let _postConsultationMethod = (callback) => {
      ServiceApi.postService({
        details: {
          name: this.costModel.name,
          tags: this.costModel.tags,
          price: parseInt(this.costModel.cost, 10)
        },
        invitations: []
      }).$promise.then((res)=> {
        if (typeof callback === 'function') {
          callback()
        }
      }, (err)=> {
        proTopAlertService.error({
          message: 'error',
          timeout: 4
        })
      })
    }


    let _calculateProgressPercentage = () => {
      this.progressBarWidth = Math.ceil(this.queue.completedSteps / this.queue.amountOfSteps * 100)
    }
    _calculateProgressPercentage()

    $scope.$watch(() => {
      return this.queue.completedSteps
    }, _calculateProgressPercentage)

    this.backToFirstStep = () => {
      if (isExpert) {
        $state.go('app.dashboard.service-provider.individual-path')
      } else {
        $state.go('app.dashboard.service-provider.company-path')
      }

    }

    if (savedProfile && savedProfile.expertDetails) {
      this.profile = savedProfile.expertDetails
      this.consultations = savedProfile.services
      isExpert = true
    } else if (savedProfile.organizationDetails) {
      this.profile = savedProfile.organizationDetails
    }

    this.saveConsultationObject = () => {
      if (this.queue.completedSteps === this.queue.amountOfSteps) {
        _postConsultationMethod()
      }
      $state.go('app.dashboard.service-provider.summary')
    }

    this.isConsultationPresent = () => {
      return this.consultations.length > 0
    }

    this.editConsultation = (id, name, price, tags) => {
      this.currentEditConsultationId = this.currentEditConsultationId === id ? -1 : id
      this.editQueue = {
        amountOfSteps: 3,
        currentStep: 4,
        completedSteps: 3,
        skippedSteps: {}
      }
      this.editModel = {
        name: name,
        tags: tags,
        cost: price
      }
      this.updateConsultation = () => {
        ServiceApi.putService({
          serviceId: id
        }, {
          details: {
            name: this.editModel.name,
            tags: this.editModel.tags,
            price: parseInt(this.editModel.cost, 10)
          },
          invitations: []
        }).$promise.then(() => {
          $state.reload()
        })
      }
    }
    this.deleteConsultation = (id, index) => {
      ServiceApi.deleteService({
        serviceId: id
      }).$promise.then((res)=> {
        this.consultations.splice(index, 1)
      }, (err) => {
        proTopAlertService.error({
          message: 'error',
          timeout: 4
        })
      })
    }

    this.addAnotherConsultation = () => {
      _postConsultationMethod($state.reload)
    }

    return this
  }


  angular.module('profitelo.controller.dashboard.service-provider.consultation-range', [
    'ui.router',
    'profitelo.services.service-provider-state',
    'profitelo.directives.service-provider.pro-bottom-summary-row',
    'profitelo.directives.service-provider.pro-service-provider-cost',
    'profitelo.directives.service-provider.pro-service-provider-who-provides',
    'profitelo.swaggerResources',
    'profitelo.directives.service-provider.pro-service-provider-tags',
    'profitelo.directives.service-provider.pro-bottom-consultation-button',
    'c7s.ng.userAuth',
    'profitelo.directives.interface.pro-alert'
  ])
  .config( function($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.service-provider.consultation-range', {
      url:          '/consultation-range',
      templateUrl:  'dashboard/service-provider/consultation-range/consultation-range.tpl.html',
      controller:   'ConsultationRangeController',
      controllerAs: 'vm',
      resolve: {
        /* istanbul ignore next */
        savedProfile: ($q, $state, ProfileApi, User) => {

          let _deferred = $q.defer()
          User.getStatus().then(() => {
            ProfileApi.getProfileWithServices({
              profileId: User.getData('id')
            }).$promise.then((response)=>{
              _deferred.resolve(response)
            }, () => {
              _deferred.resolve(null)
            }, (error)=> {
              _deferred.reject(error)
              $state.go('app.dashboard')
              proTopAlertService.error({
                message: 'error',
                timeout: 4
              })
            })
          }, (error) => {
            $state.go('app.dashboard')
            proTopAlertService.error({
              message: 'error',
              timeout: 4
            })
          })


          return _deferred.promise
        }
      },
      data: {
        access : UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.CONSULTATION_RANGE'
      }
    })
  })
  .controller('ConsultationRangeController', ConsultationRangeController)

}())
