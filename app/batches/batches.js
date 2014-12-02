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
    
    $routeProvider.when('/batches/:batch_id', {
		templateUrl	: 'app/batches/batch_view.html',
		controller	: 'batchViewCtrl',
		resolve: {
			authenticated: function(authFactory){
				return authFactory.resolveIsLoggedIn();	
			}
		}
	});
    
    $routeProvider.when('/batches/create', {
		templateUrl	: 'app/batches/batch_create.html',
		controller	: 'batchCreateCtrl',
		resolve: {
			authenticated: function(authFactory){
				return authFactory.resolveIsLoggedIn();	
			}
		}
	});
}]);