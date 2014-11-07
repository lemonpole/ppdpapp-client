var auth = angular.module('ppdpappFactories', []);

auth.factory('authFactory', ['$q', '$location', 'authInfo', function($q, $location, authInfo){
	var dataFactory = {};
	
	dataFactory.isLoggedIn = function(){
		var deferred = $q.defer();
		var authenticated = true;
		
		// check if global token var is set.
		// check that token corresponds to current user or that it did not expire.
		// redirect to appropriate route.
		if(authInfo.token == undefined || authInfo.email == undefined) authenticated = false;
		
		if(!authenticated){
			deferred.reject();
			$location.path('/login');
		} else deferred.resolve();
		
		return deferred.promise;
	};
	
	return dataFactory;
}]);