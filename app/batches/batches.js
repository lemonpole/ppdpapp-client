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
		templateUrl	: 'app/batches/view_batch.html',
		controller	: 'viewBatchCtrl',
		resolve: {
			authenticated: function(authFactory){
				return authFactory.resolveIsLoggedIn();	
			}
		}
	});
    
    $routeProvider.when('/batches/create', {
		templateUrl	: 'app/batches/create_batch.html',
		controller	: 'createBatchCtrl',
		resolve: {
			authenticated: function(authFactory){
				return authFactory.resolveIsLoggedIn();	
			}
		}
	});
}]);