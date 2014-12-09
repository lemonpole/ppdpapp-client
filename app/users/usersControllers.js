var users = angular.module('usersControllers', ['usersFactory']);

users.controller('usersCtrl', ['$scope', 'usersAPI', 'authInfo', function($scope, usersAPI, authInfo){
    $scope.gridOptions = {};
    $scope.loaded = false;
    $scope.requestFailed = false;
    
    $scope.refresh = function() {
        $scope.loaded = false;
        $scope.requestFailed = false;
        usersAPI.getAll(authInfo.token).success(function(res){
            $scope.gridOptions.data = res;
            $scope.loaded = true;
            $scope.requestFailed = false;
        }).error(function() {
            $scope.loaded = false;
            $scope.requestFailed = true;
        });
    };
    $scope.refresh();
}]);
users.controller('userCreateCtrl', ['$scope', '$location', 'usersAPI', 'authInfo', function($scope, $location, usersAPI, authInfo){
    $scope.role_dd_status = false;
    $scope.role_type = null;
    
    usersAPI.getAllRoles(authInfo.token).success(function(res){
        $scope.role_dd_items = res;
    });
    $scope.setRoleType = function(roleObj){
        $scope.role_type = roleObj;
    };
    
    $scope.create = function(){
        $scope.processing = true;
        var userObj = {};
		userObj.email = $scope.accessnet + '@temple.edu';
		userObj.role = $scope.role_type;
		userObj.firstName = $scope.fname;
		userObj.lastName = $scope.lname;
		userObj.isActive = true;
		userObj.dateAdded = new Date();
        
        usersAPI.create(authInfo.token, userObj).success(function(res){
            $scope.processing = false;
            $location.path('/users/');
        });
    };
}]);