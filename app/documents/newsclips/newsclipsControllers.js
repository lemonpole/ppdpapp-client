var newsclips = angular.module('newsclipsControllers', ['newsclipsFilters', 'newsclipsFactory', 'batchesFactory']);

newsclips.controller('newsclipsCtrl', ['$scope', '$routeParams', '$q', 'newsclipsAPI', 'authInfo', function($scope, $routeParams, $q, newsclipsAPI, authInfo){
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
	
	$scope.reloadNewsclips = function(){
		newsclipsAPI.getAll(authInfo.token).success(function(res){ $scope.gridNewsclips.data = res; });
	};
	$scope.reloadNewsclips();
	
	$scope.saveRow = function(rowEntity){
		var promise = newsclipsAPI.update(authInfo.token, rowEntity);
		$scope.gridApi.rowEdit.setSavePromise($scope.gridApi.grid, rowEntity, promise);
		promise.success(function(res){
			console.log(rowEntity);
		});
	};
	$scope.gridNewsclips.onRegisterApi = function(gridApi){
		//set gridApi on scope
		$scope.gridApi = gridApi;
		gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
	};
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
newsclips.controller('newsclipsCodeCtrl', ['$scope', '$routeParams', '$q', 'authInfo', 'newsclipsAPI', 'codesAPI', function($scope, $routeParams, $q, authInfo, newsclipsAPI, codesAPI){
	$scope.gridOptions = {
        columnDefs: [
            { field: 'ID', enableCellEdit: false },
            { field: 'Headline', enableCellEdit: false },
            { field: 'Abstract', enableCellEdit: false },
			{ name: 'Coding', enableCellEdit: true, enableCellEditOnFocus:true, editableCellTemplate:'app/documents/newsclips/partials/cellTemplate_coding.html' }
        ]
    };
	
	// the reason all results are returned is because the typeahead expects functions to return a new result
	// that reflects the current value. this method returns all the codes NO MATTER WHAT
	$scope.external = {
		loading: false,
		searchCodes: function(s){
			return codesAPI.search(authInfo.token, 'Newsclips', s).then(function(res){ return res.data; });
		},
		onSelect: function($item, $model, $label, row){
			row.entity.Coding = $item.Code;
		}
	};
	
	$scope.reloadBatchDocs = function(){
		newsclipsAPI.noCode(authInfo.token, $routeParams.batch_id).success(function(res){ $scope.gridOptions.data = res; });	
	};
	$scope.reloadBatchDocs();
	
	$scope.editedRows = [];
	$scope.gridOptions.onRegisterApi = function(gridApi){
		$scope.gridApi = gridApi;
		gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue){
			if(typeof rowEntity.Coding !== 'undefined' && rowEntity.Coding.length > 0){
				$scope.editedRows[rowEntity.ID] = rowEntity;
			} else {
				$scope.editedRows[rowEntity.ID] = undefined;
			}
		});
	};
	$scope.codeDocs = function(){
		var promises = [];
		$scope.processing = true;
		$scope.editedRows.forEach(function(row){
			if(typeof row !== 'undefined'){
				promises.push(newsclipsAPI.addCode(authInfo.token, row.ID, $routeParams.batch_id, row.Coding));
			}
		});
		
		$q.all(promises).then(function(){
			$scope.processing = false;
			$scope.reloadBatchDocs();
		});
	};
}]);