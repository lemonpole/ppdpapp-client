var acct = angular.module('accountControllers', ['accountFactory']);

acct.controller('accountLoginCtrl', ['$scope', '$location', 'accountAPI', 'authInfo', 'usersAPI', function($scope, $location, accountAPI, authInfo, usersAPI){
	$scope.processing = false;
	$scope.error = false;
	
	$scope.closeAlert = function(){
		$scope.error = false;
	};
	$scope.login = function(){
		$scope.processing = true;
		accountAPI.postLogin($scope.account.email, $scope.account.password).success(function(token){
			authInfo.token = token;
			authInfo.email = $scope.account.email;
            usersAPI.findByEmail(authInfo.email, authInfo.token).success(function(res) {
                authInfo.user = res;
                $location.path('/assignments');
                console.log(authInfo, 'wooooo');
            }).error(function(error) {
                alert('Could not login successfully. Please try again.');
                $scope.error = error;
            });
		}).error(function(error){
			$scope.error = error;
		}).finally(function(){
			$scope.processing = false;
		});
	};
}]);