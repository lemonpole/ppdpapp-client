var newsclips = angular.module('newsclipsControllers', ['newsclipsFilters', 'newsclipsFactory', 'batchesFactory']);

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
	$scope.process_action = $routeParams.action;
	$scope.processing_action = false;
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
	
	$scope.reloadNoBatch = function(){
		newsclipsAPI.noBatch(authInfo.token).success(function(res){ $scope.gridNewsclips.data = res; });
	};
	$scope.reloadBatchDocs = function(){
		batchesAPI.getDocuments(authInfo.token, batch_id).success(function(res){ $scope.gridNewsclips.data = res; });	
	};
	
	var batch_id = $routeParams.batch_id;
	if(typeof batch_id === 'undefined'){
		newsclipsAPI.getAll(authInfo.token).success(function(res){ $scope.gridNewsclips.data = res; });
	} else {
		switch($routeParams.action){
			case 'add':
				$scope.reloadNoBatch();
				break;
			case 'view':
				$scope.reloadBatchDocs();
				break;
		}
	}
	
	$scope.gridNewsclips.onRegisterApi = function(gridApi){ 
        $scope.gridApi = gridApi;
    };
    $scope.doBatchAction = function(){
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
		var promises = [];
		$scope.processing_action = true;
        
        for(var i=0; i<selectedRows.length; i++){
			switch($routeParams.action){
				case 'add':
					promises.push(batchesAPI.addDocument(authInfo.token, batch_id, selectedRows[i].ID));
					break;
				case 'view':
				case 'delete':
					promises.push(batchesAPI.deleteDocument(authInfo.token, batch_id, selectedRows[i].ID));
					break;
			}
		}
		
		$q.all(promises).then(function(){
			$scope.processing_action = false;
			//$location.path('/batches/' + $routeParams.batch_id + '/view/newsclips');
			switch($routeParams.action){
				case 'add':
					$scope.reloadNoBatch();
					break;
				case 'view':
				case 'delete':
					$scope.reloadBatchDocs();
					break;
			}
		});
    };
}]);
newsclips.controller('newsclipsCodeCtrl', ['$scope', '$routeParams', '$q', 'authInfo', 'newsclipsAPI', function($scope, $routeParams, $q, authInfo, newsclipsAPI){
	$scope.gridOptions = {
        columnDefs: [
            { field: 'Headline' },
            { field: 'Abstract' },
			{ name: 'Coding' }
        ]
    };
	
	$scope.reloadBatchDocs = function(){
		newsclipsAPI.noCode(authInfo.token, $routeParams.batch_id).success(function(res){ $scope.gridOptions.data = res; });	
	};
	$scope.reloadBatchDocs();
	
	$scope.gridOptions.onRegisterApi = function(gridApi){
		//set gridApi on scope
		$scope.gridApi = gridApi;
	};
}]);