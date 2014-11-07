var acct = angular.module('accountControllers', ['accountFactory']);

acct.controller('accountLoginCtrl', ['$scope', '$location', 'accountAPIFactory', 'authInfo', function($scope, $location, accountAPIFactory, authInfo){
	$scope.processing = false;
	$scope.error = false;
	
	$scope.closeAlert = function(){
		$scope.error = false;
	};
	$scope.login = function(){
		$scope.processing = true;
		
		accountAPIFactory.postLogin($scope.account.email, $scope.account.password).success(function(token){
			authInfo.token = token;
			authInfo.email = $scope.account.email;
			$location.path('/');
		}).error(function(error){
			$scope.error = error;
		}).finally(function(){
			$scope.processing = false;
		});
	};
}]);