function expertProfileDirectiveController($scope, $filter, $timeout, $http, $q, Upload, FilesGetTokenApi, toastr, _) {
  var vm = this

  vm.pending = false

  // public variables
  vm.profile = {}
  vm.profile.profileProgressPercentage = 40
  vm.profile.profileStatus = 'off'

  // store only form data
  vm.profile.formdata = {}
  vm.profile.formdata.fullname = ''
  vm.profile.formdata.infoDescription = ''

  vm.log = ''
  vm.profile.formdata.coverFile = ''
  vm.profile.formdata.coverFiles = ''
  vm.profile.formdata.avatarFile = ''
  vm.profile.formdata.avatarFiles = ''
  vm.profile.formdata.documentFile = ''
  vm.profile.formdata.documentFiles = ''

  // TODO if further graphic structure will be available need to reconfigure
  vm.allFilesProgress       = 0
  vm.coverFilesProgress     = 0
  vm.avatarFilesProgress    = 0

  vm.currentlyUploadedDocuments = [] // no need to have this kind of var for single cover, avatar


  if ($scope.profilesNew !== 'undefined') {
    vm.profile.formdata.fullname    =  $scope.profilesNew.details.current.name
    vm.profile.formdata.generalInfo =  $scope.profilesNew.details.current.description
  }


  // private methods
  var _isContainEmptyStrings = function(array) {
    return _.includes(array, '')
  }


  var _calculatePercentage = function() {

  }


  vm.isFilesExist = function(array) {
    return !!(!_isContainEmptyStrings(array) && array.length > 0)
  }


  // public method
  // TODO this method NEED TO BE updated if graphic and UX specify finall requirements (for multi type-source upload)
  vm.uploadCover = function(files) {
    if (files && files.length && !_isContainEmptyStrings(files)) {
      for (var i = 0; i < files.length; i++) {
        var oneFile = files[i]
        if (!oneFile.$error) {
          FilesGetTokenApi.get().$promise.then( function(getTokenResponse) {
            console.log('getTokenResponse', getTokenResponse)
            // TODO add uploading file with file progress bars
            Upload.upload({
              url:  getTokenResponse.uploadUrl,
              data: {
                file: oneFile
              }
            }).then(
              function(coverUploadResponse) {
                // var msg   = $filter('translate')('EXPERT_PROFILE.MESSAGES.DATA_SAVED_SUCCESSFULLY')
                // var title = $filter('translate')('EXPERT_PROFILE.EXPERT_PROFILE')
                // toastr.success(msg, title)
                toastr.success('Uploading profile\'s cover compleate successfully')
              },
              function(coverUploadError) {
                toastr.error('Uploading profile\'s cover failed')
                console.log('Error', coverUploadError)
              },
              function(coverUploadEvent) {
                console.log('coverUploadEvent', coverUploadEvent)
                let progressPercentage = parseInt((100.0 * coverUploadEvent.loaded / coverUploadEvent.total), 10)
                vm.coverFilesProgress = progressPercentage
                console.log('progress: ' + progressPercentage + '% ' + coverUploadEvent.config.data.file.name)
              }
            )
          }, function(getTokenError) {
            console.log('Error:', getTokenError)
          })
        }
      }
    }
  }


  // public method
  // TODO this method NEED TO BE updated if graphic and UX specify finall requirements (for multi type-source upload)
  vm.uploadAvatar = function(files) {
    if (files && files.length && !_isContainEmptyStrings(files)) {
      for (var i = 0; i < files.length; i++) {
        var oneFile = files[i]
        if (!oneFile.$error) {
          FilesGetTokenApi.get().$promise.then( function(getTokenResponse) {
            console.log('getTokenResponse', getTokenResponse)
            // TODO add uploading file with file progress bars
            Upload.upload({
              url:  getTokenResponse.uploadUrl,
              data: {
                file: oneFile
              }
            }).then(
              function(avatarUploadResponse) {
                toastr.success('Uploading profile\'s document compleate successfully')
              },
              function(avatarUploadError) {
                toastr.error('Uploading profile\'s document failed')
                console.log('Error', coverUploadError)
              },
              function(avatarUploadEvent) {
                console.log('avatarUploadEvent', avatarUploadEvent)
                let progressPercentage = parseInt((100.0 * avatarUploadEvent.loaded / avatarUploadEvent.total), 10)
                vm.avatarFilesProgress = progressPercentage
                console.log('progress: ' + progressPercentage + '% ' + avatarUploadEvent.config.data.file.name)
              }
            )
          }, function(getTokenError) {
            console.log('Error:', getTokenError)
          })
        }
      }
    }
  }


  vm.uploadDocuments = function() {
    var files = vm.profile.formdata.documentFiles

    var tokenPromisses = []

    if (files && files.length && !_isContainEmptyStrings(files)) {
      var deferred = $q.defer()
      for (var i = 0; i < files.length; i++) {
        if (!files[i].$error) {
          tokenPromisses.push(FilesGetTokenApi.get().$promise)
        }
      }

      $q.all(tokenPromisses).then(
        function(tokenPromissesResponse) {
          console.log("tokenPromissesResponse", tokenPromissesResponse)
          for(var k = 0; k < files.length; k++ ) {
            files[k].progress = 0
            Upload.upload({
              url:  tokenPromissesResponse[k].uploadUrl,
              data: {
                file: files[k]
              }
            }).then(
              function(documentUploadResponse) {
                toastr.success('Uploading profile\'s document successfully compleated')
              },
              function(documentUploadError) {
                toastr.error('Uploading profile\'s document failed')
                console.log('Error', documentUploadError)
              },
              function(documentUploadEvent) {
                console.log('documentUploadEvent', documentUploadEvent)
                let progressPercentage = parseInt((100.0 * documentUploadEvent.loaded / documentUploadEvent.total), 10)
                documentUploadEvent.config.data.file.progress = progressPercentage
                console.log('progress: ' + progressPercentage + '%, of file ' + documentUploadEvent.config.data.file.name)
              }
            )
          }
      }, function(tokenPromissesError) {
        console.log("tokenPromissesError", tokenPromissesError)
      })
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
    vm.uploadCover(vm.profile.formdata.coverFiles)
  })
  $scope.$watch('vm.profile.formdata.coverFile', function() {
    if (vm.profile.formdata.coverFile != null) {
      vm.profile.formdata.coverFiles = [vm.profile.formdata.coverFile]
    }
  })

  // profile avatar
  $scope.$watch('vm.profile.formdata.avatarFiles', function() {
    vm.uploadAvatar(vm.profile.formdata.avatarFiles)
  })
  $scope.$watch('vm.profile.formdata.avatarFile', function() {
    if (vm.profile.formdata.avatarFile != null) {
      vm.profile.formdata.avatarFiles = [vm.profile.formdata.avatarFile]
    }
  })

  // certyficates dyplomas documents
  $scope.$watch('vm.profile.formdata.documentFiles', function() {
    vm.uploadDocuments()
  })

  return vm
}

angular.module('profitelo.directives.pro-expert-profile', [
  'ngFileUpload',
  'ngAnimate',
  'toastr',         // some parts depends on ngAnimate
  'lodash',

  // internal scripts
  'profitelo.api.accounts',
  'profitelo.api.session',
  'profitelo.api.files',
  'profitelo.api.profiles',
  'profitelo.directives.pro-profile-status',
  'profitelo.directives.pro-question-mark',
  'profitelo.directives.pro-upload-progress-bar',
  'profitelo.directives.pro-waiting-spinner-span'
])

.directive('proExpertProfile', function(ProfilesNewApi) {
  return {
    replace:        true,
    templateUrl:    'directives/pro-expert-profile/pro-expert-profile.tpl.html',
    controller:     expertProfileDirectiveController,
    controllerAs:   'vm',
    scope: {
      profilesNew:  '='
    }
  }
})

