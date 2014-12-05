var newsclips = angular.module('newsclipsControllers', ['newsclipsFactory', 'batchesFactory']);

newsclips.controller('newsclipsCtrl', ['$scope', '$routeParams', 'newsclipsAPI', 'batchesAPI', 'authInfo', function($scope, $routeParams, newsclipsAPI, batchesAPI, authInfo){
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
		if($routeParams.action == 'add'){
			newsclipsAPI.noBatch(authInfo.token).success(function(res){ $scope.gridNewsclips.data = res; });
			$scope.adding_batch = true;
		} else if($routeParams.action == 'delete'){
			batchesAPI.getDocuments(authInfo.token, batch_id).success(function(res){ $scope.gridNewsclips.data = res; });
			$scope.deleting_batch = true;
		} else if($routeParams.action == 'view'){
			batchesAPI.getDocuments(authInfo.token, batch_id).success(function(res){ $scope.gridNewsclips.data = res; });
		}
	}
    
    $scope.gridNewsclips.onRegisterApi = function(gridApi){ 
        $scope.gridApi = gridApi;
    };
    $scope.doBatchAction = function(action){
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
        
        for(var i=0; i<selectedRows.length; i++){
			// call api to add selectedRow to current batch.
			// redirect to batch view.
			if(action=='add'){
				batchesAPI.addDocument(authInfo.token, batch_id, selectedRows[i].ID).success(function(res){});
			} else if(action=='delete'){
				batchesAPI.deleteDocument(authInfo.token, batch_id, selectedRows[i].ID).success(function(res){});
			}
		}
    };
}]);