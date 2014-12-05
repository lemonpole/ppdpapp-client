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
newsclips.controller('newsclipsBatchCtrl', ['$scope', '$routeParams', 'newsclipsAPI', 'batchesAPI', 'authInfo', function($scope, $routeParams, newsclipsAPI, batchesAPI, authInfo){
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
	
	var batch_id = $routeParams.batch_id;
	if(typeof batch_id === 'undefined'){
		newsclipsAPI.getAll(authInfo.token).success(function(res){ $scope.gridNewsclips.data = res; });
	} else {
		switch($routeParams.action){
			case 'add':
				newsclipsAPI.noBatch(authInfo.token).success(function(res){ $scope.gridNewsclips.data = res; });
				$scope.adding_batch = true;
				break;
			case 'delete':
				batchesAPI.getDocuments(authInfo.token, batch_id).success(function(res){ $scope.gridNewsclips.data = res; });
				$scope.deleting_batch = true;
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
        
        for(var i=0; i<selectedRows.length; i++){
			switch(action){
				case 'add':
					batchesAPI.addDocument(authInfo.token, batch_id, selectedRows[i].ID).success(function(res){});
					break;
				case 'delete':
					batchesAPI.deleteDocument(authInfo.token, batch_id, selectedRows[i].ID).success(function(res){});
					break;
			}
		}
    };
}]);