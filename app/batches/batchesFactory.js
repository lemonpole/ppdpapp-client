var batches = angular.module('batchesFactory', []);

batches.factory('batchesAPI', ['$http', 'apiRoot', function($http, apiRoot){
	var dataFactory = {};
	var urlBase = apiRoot + '/batches/';
	
	dataFactory.getAll = function(token){
		return $http.get(urlBase + '?token=' + token);
	};
    dataFactory.create = function(token, batchObj){
        return $http.post(urlBase + '?token=' + token, batchObj);
    };
	
	return dataFactory;
}]);