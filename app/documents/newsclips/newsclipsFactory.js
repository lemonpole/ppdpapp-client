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
	dataFactory.addCode = function(token, doc_id, batch_id, code_id){
		return $http.post(urlBase + '/' + doc_id + '/batch/' + batch_id + '/add/code/' + code_id + '?token=' + token);
	};
	dataFactory.update = function(token, doc_obj){
		return $http.put(urlBase + '?token=' + token, doc_obj);
	};
	dataFactory.create = function(token, doc_obj){
		return $http.post(urlBase + '?token=' + token, doc_obj);
	};
	
	return dataFactory;
}]);