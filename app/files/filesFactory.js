var users = angular.module('filesFactory', []);

users.factory('filesAPI', ['$http', '$upload', 'apiRoot', function($http, $upload, apiRoot){
	var dataFactory = {};
	var urlBase = apiRoot + '/files';
	
	dataFactory.getAll = function(token){
		return $http.get(urlBase + '?token=' + token);
	};
	dataFactory.findBatch = function(token, file_id){
		return $http.get(urlBase + '/' + file_id + '/batch');
	};
	dataFactory.create = function(token, fileObj){
		return $http.post(urlBase + '?token=' + token, fileObj);
	};
	dataFactory.upload = function(token, file){
		return $upload.upload({
			url: urlBase + '?token=' + token,
			data: { data: file }
		});
	};
	
	return dataFactory;
}]);