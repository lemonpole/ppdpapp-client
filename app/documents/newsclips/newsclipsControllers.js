var newsclips = angular.module('newsclipsControllers', ['newsclipsFactory', 'batchesFactory']);

newsclips.controller('newsclipsCtrl', ['$scope', '$routeParams', 'newsclipsAPI', 'authInfo', function($scope, $routeParams, newsclipsAPI, authInfo){
    $scope.gridNewsclips = {
        enableRowSelection: true,
        enableSelectAll: true,
        multiSelect: true,
        columnDefs: [
            { field: 'Headline' },
            { field: 'Abstract' },
            { name: 'Newsclip Date', field: 'Date' }
        ]
    };
	
	newsclipsAPI.getAll(authInfo.token).success(function(res){ $scope.gridNewsclips.data = res; });
}]);
newsclips.controller('newsclipsBatchCtrl', ['$scope', '$routeParams', '$q', '$location', 'newsclipsAPI', 'batchesAPI', 'authInfo', function($scope, $routeParams, $q, $location, newsclipsAPI, batchesAPI, authInfo){
	$scope.gridNewsclips = {
        enableRowSelection: true,
        enableSelectAll: true,
        multiSelect: true,
        columnDefs: [
            { field: 'Headline' },
            { field: 'Abstract' },
            { name: 'Newsclip Date', field: 'Date' }
        ]
    };
	$scope.process_action = false;
	$scope.processing_action = [];
	$scope.processing_action[$routeParams.action] = false;
	
	var batch_id = $routeParams.batch_id;
	if(typeof batch_id === 'undefined'){
		newsclipsAPI.getAll(authInfo.token).success(function(res){ $scope.gridNewsclips.data = res; });
	} else {
		switch($routeParams.action){
			case 'add':
				newsclipsAPI.noBatch(authInfo.token).success(function(res){ $scope.gridNewsclips.data = res; });
				$scope.process_action = $routeParams.action;
				break;
			case 'delete':
				batchesAPI.getDocuments(authInfo.token, batch_id).success(function(res){ $scope.gridNewsclips.data = res; });
				$scope.process_action = $routeParams.action;
				break;
			case 'view':
				batchesAPI.getDocuments(authInfo.token, batch_id).success(function(res){ $scope.gridNewsclips.data = res; });
				break;
		}
	}
	
	$scope.gridNewsclips.onRegisterApi = function(gridApi){ 
        $scope.gridApi = gridApi;
    };
    $scope.doBatchAction = function(action){
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
		var promises = [];
		var dest = undefined;
		$scope.processing_action[action] = true;
        
        for(var i=0; i<selectedRows.length; i++){
			switch(action){
				case 'add':
					promises.push(batchesAPI.addDocument(authInfo.token, batch_id, selectedRows[i].ID));
					dest = 'view'; // where we want to end up after the action is done.
					break;
				case 'delete':
					promises.push(batchesAPI.deleteDocument(authInfo.token, batch_id, selectedRows[i].ID));
					dest = 'delete';
					break;
			}
		}
		
		$q.all(promises).then(function(){
			$scope.processing_action = false;
			$location.path('/batches/' + $routeParams.batch_id + '/' + dest + '/newsclips');
		});
    };
}]);