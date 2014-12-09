var files = angular.module('filesControllers', ['filesFactory']);

files.controller('filesCtrl', ['$scope', 'filesAPI', 'authInfo', function($scope, filesAPI, authInfo){
    $scope.gridOptions = {};
    $scope.loaded = false;
    $scope.requestFailed = false;
    
    filesAPI.getAll(authInfo.token).success(function(res){
        $scope.gridOptions.data = res;
        $scope.loaded = true;
        $scope.requestFailed = false;
    }).error(function() {
        $scope.loaded = false;
        $scope.requestFailed = true;
    });
}]);
files.controller('fileCreateCtrl', ['$scope', 'filesAPI', function($scope, filesAPI){
}]);