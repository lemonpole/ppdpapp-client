var acct = angular.module('accountControllers', ['accountFactory']);

acct.controller('accountLoginCtrl', ['$scope', '$location', 'accountAPI', 'authInfo', function($scope, $location, accountAPI, authInfo){
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
			$location.path('/assignments');
		}).error(function(error){
			$scope.error = error;
		}).finally(function(){
			$scope.processing = false;
		});
	};
}]);