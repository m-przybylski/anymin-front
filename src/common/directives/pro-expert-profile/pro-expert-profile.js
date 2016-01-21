function expertProfileDirectiveController($scope, $filter, $timeout, $http, Upload, FilesGetTokenApi, toastr, _) {
  var vm = this

  vm.pending = false

  var _account        = $scope.account
  var _userProfiles   = $scope.userProfiles

  // public variables
  vm.profile = {}
  vm.profile.profileProgressPercentage = 40
  vm.profile.profileStatus = 'off'

  // store only form data
  vm.profile.formdata = {}
  vm.profile.formdata.generalInfo = ''

  vm.log = ''
  vm.profile.formdata.coverFile = ''
  vm.profile.formdata.coverFiles = ''
  vm.profile.formdata.avatarFile = ''
  vm.profile.formdata.avatarFiles = ''
  vm.profile.formdata.documentFile = ''
  vm.profile.formdata.documentFiles = ''

  // TODO if further graphic structure will be available need to reconfigure
  vm.allFilesProgress = null
  vm.coverFilesProgress = null
  vm.avatarFilesProgress = null
  vm.documentFilesProgress = null

  vm.currentlyUploadedDocuments = [] // no need to have this kind of var for single cover, avatar

  // private methods
  var _isContainEmptyStrings = (array) => {
    return _.includes(array, '')
  }

  vm.isFilesExist = (array) => {
    return !!(!_isContainEmptyStrings(array) && array.length > 0)
  }


  // public method
  // TODO this method NEED TO BE updated if graphic and UX specify finall requirements (for multi type-source upload)
  vm.upload = function(files) {
    if (files && files.length && !_isContainEmptyStrings(files)) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i]
        if (!file.$error) {
          FilesGetTokenApi.get().$promise.then( function(getTokenResponse) {
            console.log('getTokenResponse', getTokenResponse)
            // TODO add uploading file with file progress bars
            var msg   = $filter('translate')('EXPERT_PROFILE.MESSAGES.DATA_SAVED_SUCCESSFULLY')
            var title = $filter('translate')('EXPERT_PROFILE.EXPERT_PROFILE')
            toastr.success(msg, title)
          }, function(getTokenError) {
            console.log('Error:', getTokenError)
          })
        }
      }
    }
  }

  vm.sendAndGoNext = function() {
    vm.submitted = true
    if ($scope.expertProfileForm.$valid) {
      // TODO updating profile on save
      ProfilesApi.update().$promise.then( function(profilesResponse) {
        console.log('profilesResponse', profilesResponse)
        var msg   = $filter('translate')('EXPERT_PROFILE.MESSAGES.DATA_SAVED_SUCCESSFULLY')
        var title = $filter('translate')('EXPERT_PROFILE.EXPERT_PROFILE')
        toastr.success(msg, title)
      }, function(getTokenError) {
        console.log('Error:', getTokenError)
      })
    }
  }

  // watches
  // profile background
  $scope.$watch('vm.profile.formdata.coverFiles', function() {
    vm.upload(vm.profile.formdata.coverFiles)
  })
  $scope.$watch('vm.profile.formdata.coverFile', function() {
    if (vm.profile.formdata.coverFile != null) {
      vm.profile.formdata.coverFiles = [vm.profile.formdata.coverFile]
    }
  })

  // profile avatar
  $scope.$watch('vm.profile.formdata.avatarFiles', function() {
    vm.upload(vm.profile.formdata.avatarFiles)
  })
  $scope.$watch('vm.profile.formdata.avatarFile', function() {
    if (vm.profile.formdata.avatarFile != null) {
      vm.profile.formdata.avatarFiles = [vm.profile.formdata.avatarFile]
    }
  })

  // certyficates dyplomas documents
  $scope.$watch('vm.profile.formdata.documentFiles', function() {
    vm.upload(vm.profile.formdata.documentFiles)
  })
  $scope.$watch('vm.profile.formdata.documentFile', function() {
    if (vm.profile.formdata.documentFile != null) {
      vm.profile.formdata.documentFiles = [vm.profile.formdata.documentFile]
    }
  })

  return vm
}

angular.module('profitelo.directives.pro-expert-profile', [
  'ngFileUpload',
  'ngAnimate',
  'toastr',  // some parts depends on ngAnimate
  'lodash',

  // internal scripts
  'profitelo.api.accounts',
  'profitelo.api.sessions',
  'profitelo.api.files',
  'profitelo.directives.proProfileStatus',
  'profitelo.directives.proQuestionMark',
  'profitelo.directives.proWaitingSpinnerDiv'
])

.directive('proExpertProfile', () => {
  return {
    replace:        true,
    templateUrl:    'directives/pro-expert-profile/pro-expert-profile.tpl.html',
    controller:     expertProfileDirectiveController,
    controllerAs:   'vm',
    scope: {
      account:      '=',
      userProfile:  '='
    }
  }
})

