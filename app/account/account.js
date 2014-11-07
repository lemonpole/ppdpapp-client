var acct = angular.module('account', ['accountControllers']);

acct.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/login', {
		templateUrl	: 'app/account/login.html',
		controller	: 'accountLoginCtrl',
	});
}]);