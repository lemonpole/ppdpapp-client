var factories = angular.module('ppdpappFactories', []);

factories.factory('authFactory', ['$q', '$location', 'authInfo', function($q, $location, authInfo){
	var dataFactory = {};
	
	dataFactory.resolveIsLoggedIn = function(){
		var deferred = $q.defer();
		var authenticated = true;
		
		// enable the two lines below for debugging.
		//deferred.resolve();
		//return deferred.promise;
		
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

factories.factory('tablesAPI', ['$http', 'apiRoot', function($http, apiRoot){
	var dataFactory = {};
	var urlBase = apiRoot + '/tables';
	
	dataFactory.getAll = function(token){
		return $http.get(urlBase + '?token=' + token);
	};
    dataFactory.getByName = function(token, name){
        return $http.get(urlBase + '/name/' + name + '?token=' + token);  
    };
    dataFactory.find = function(token, id){
        return $http.get(urlBase + '/id/' + id + '?token=' + token);  
    };
    
	return dataFactory;
}]);