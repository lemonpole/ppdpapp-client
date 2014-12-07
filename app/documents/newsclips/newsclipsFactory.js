var newsclips = angular.module('newsclipsFactory', []);

newsclips.factory('newsclipsAPI', ['$http', 'apiRoot', function($http, apiRoot){
	var dataFactory = {};
	var urlBase = apiRoot + '/documents/NewsClips';
	
	dataFactory.getAll = function(token){
		return $http.get(urlBase + '?token=' + token);
	};
	dataFactory.noBatch = function(token){
		return $http.get(urlBase + '/nobatch?token=' + token);	
	};
	dataFactory.noCode = function(token, batch_id){
		return $http.get(urlBase + '/batch/' + batch_id + '/nocodes/?token=' + token);	
	};
	
	return dataFactory;
}]);