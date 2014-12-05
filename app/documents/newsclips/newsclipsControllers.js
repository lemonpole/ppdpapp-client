var newsclips = angular.module('newsclipsControllers', ['newsclipsFactory']);

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
	
	// if batch_id is not undefined, then we need to fetch all the documents that are not assigned to a batch.
	// also trigger a flag for the frontend to display a button to add selected documents to a batch.
	var batch_id = $routeParams.batch_id;
	$scope.adding_batch = false;
	if(typeof batch_id === 'undefined'){
		newsclipsAPI.getAll(authInfo.token).success(function(res){ $scope.gridNewsclips.data = res; });
	} else {
		newsclipsAPI.noBatch(authInfo.token).success(function(res){ $scope.gridNewsclips.data = res; });
		$scope.adding_batch = true;
	}
    
    $scope.gridNewsclips.onRegisterApi = function(gridApi){ 
        $scope.gridApi = gridApi;
    };
    $scope.addToBatch = function(){
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
        
        for(var i=0; i<selectedRows.length; i++){
			// do work.
		}
    };
}]);