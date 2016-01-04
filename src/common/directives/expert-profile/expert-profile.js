function ExpertProfileDirectiveController($scope, $filter, $timeout, $http, Upload, toastr, _) {
  var vm = this;

  vm.pending = false;

  var _account = $scope.account;

  // public variables
  vm.profile = {};
  vm.profile.profileProgressPercentage = 40;
  vm.profile.profileStatus = 'off';

  // store only form data
  vm.profile.formdata = {};
  vm.profile.formdata.generalInfo = _account.organizations.profiles[0].generalInfo;

  vm.log = '';
  vm.profile.formdata.coverFile = '';
  vm.profile.formdata.coverFiles = '';
  vm.profile.formdata.avatarFiles = '';
  vm.profile.formdata.avatarFile = '';
  vm.profile.formdata.documentFiles = '';
  vm.profile.formdata.documentFile = '';

  // TODO if further graphic structure will be available need to reconfigure
  vm.allFilesProgress = null;
  vm.coverFilesProgress = null;
  vm.avatarFilesProgress = null;
  vm.documentFilesProgress = null;


  // private methods
  var _isContainEmptyStrings = (array) => {
    return _.includes(array, '')
  };

  vm.isFilesExist = (array) => {
    return !!(!_isContainEmptyStrings(array) && array.length > 0);
  };


  // public method
  // TODO this method NEED TO BE updated if graphic and UX specify finall requirements (for multi type-source upload)
  vm.upload = function(files) {
    if (files && files.length && !_isContainEmptyStrings(files)) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (!file.$error) {
          Upload.upload({
            url: 'https://angular-file-upload-cors-srv.appspot.com/upload', // temporary adres
            data: {
              // username:   $scope.username,
              file:       file
            }
          }).progress(function(evt) {
            vm.allFilesProgress = parseInt(100.0 * evt.loaded / evt.total, 10);
            vm.log = 'progress: ' + vm.allFilesProgress + '% ' + evt.config.data.file.name + '\n' + vm.log;
          }).success(function(data, status, headers, conf) {
            vm.allFilesProgress = null;
            $timeout(function() {
              vm.log = 'file: ' + conf.data.file.name + ', Response: ' + JSON.stringify(data) + '\n' + vm.log;
              toastr.success('file uploaded successfully')
            });
          });
        }
      }
    }
  };

  vm.sendAndGoNext = function() {
    vm.submitted = true;
    var msg = $filter('translate')('EXPERT_PROFILE.MESSAGES.DATA_SAVED_SUCCESSFULLY');
    var title = $filter('translate')('EXPERT_PROFILE.EXPERT_PROFILE');
    if ($scope.expertProfileForm.$valid) {
      toastr.success(msg, title);
    }
  };


  // watches

  // profile background
  $scope.$watch('vm.profile.formdata.coverFiles', function() {
    vm.upload(vm.profile.formdata.coverFiles)
  });
  $scope.$watch('vm.profile.formdata.coverFile', function() {
    if (vm.profile.formdata.coverFile != null) {
      vm.profile.formdata.coverFiles = [vm.profile.formdata.coverFile];
    }
  });

  // profile avatar
  $scope.$watch('vm.profile.formdata.avatarFiles', function() {
    vm.upload(vm.profile.formdata.avatarFiles);
  });
  $scope.$watch('vm.profile.formdata.avatarFile', function() {
    if (vm.profile.formdata.avatarFile != null) {
      vm.profile.formdata.avatarFiles = [vm.profile.formdata.avatarFile];
    }
  });

  // certyficates dyplomas documents
  $scope.$watch('vm.profile.formdata.documentFiles', function() {
    vm.upload(vm.profile.formdata.documentFiles);
  });
  $scope.$watch('vm.profile.formdata.documentFile', function() {
    if (vm.profile.formdata.documentFile != null) {
      vm.profile.formdata.documentFiles = [vm.profile.formdata.documentFile];
    }
  });

  return vm;
}

angular.module('profitelo.directive.expert-profile', [
  'ngFileUpload',
  'ngAnimate',
  'toastr',  // some parts depends on ngAnimate
  'lodash',

  // internal scripts
  'profitelo.services.rest.accounts',
  'profitelo.services.rest.sessions',
  'profitelo.directives.proProfileStatus',
  'profitelo.directives.proQuestionMark',
  'profitelo.directives.proWaitingSpinnerDiv'
])

.directive('expertProfile', () => {
  return {
    templateUrl: 'directives/expert-profile/expert-profile.tpl.html',
    replace: true,
    controller: ExpertProfileDirectiveController,
    controllerAs: 'vm',
    scope: {
      account: '='
    }
  }
});
