var batches = angular.module('batches', ['batchesControllers']);

batches.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/batches', {
		templateUrl	: 'app/batches/batches.html',
		controller	: 'batchesCtrl',
		resolve: {
			authenticated: function(authFactory){
				return authFactory.resolveIsLoggedIn();	
			}
		}
	});
}]);