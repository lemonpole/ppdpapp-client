var users = angular.module('usersControllers', ['usersFactory']);

users.controller('usersCtrl', ['$scope', 'usersAPI', 'authInfo', function($scope, usersAPI, authInfo){
    $scope.gridOptions = {};
    
    usersAPI.getAll(authInfo.token).success(function(res){
        $scope.gridOptions.data = res;
    });
}]);