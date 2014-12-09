var users = angular.module('filesFactory', []);

users.factory('filesAPI', ['$http', 'apiRoot', function($http, apiRoot){
	var dataFactory = {};
	var urlBase = apiRoot + '/files';
	
	dataFactory.getAll = function(token){
		return $http.get(urlBase + '?token=' + token);
	};
	dataFactory.findBatch = function(token, file_id){
		return $http.get(urlBase + '/' + file_id + '/batch');
	};
	
	return dataFactory;
}]);