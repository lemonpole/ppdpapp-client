var newsclips = angular.module('newsclipsControllers', ['newsclipsFilters', 'newsclipsFactory', 'batchesFactory']);

newsclips.controller('newsclipsCtrl', ['$scope', '$routeParams', '$q', 'newsclipsAPI', 'authInfo', function($scope, $routeParams, $q, newsclipsAPI, authInfo){
    $scope.loaded = false;
    $scope.requestFailed = false;
    
    $scope.gridNewsclips = {
        enableRowSelection: true,
        enableSelectAll: true,
        multiSelect: true,
        columnDefs: [
			{ field: 'ID' },
            { field: 'Headline' },
            { field: 'Abstract' },
            { name: 'Newsclip Date', field: 'Date' }
        ]
    };
	
	$scope.reloadNewsclips = function(){
        $scope.loaded = false;
        $scope.requestFailed = false;
        
		newsclipsAPI.getAll(authInfo.token).success(function(res){
            $scope.gridNewsclips.data = res;
            $scope.loaded = true;
            $scope.requestFailed = false;
        }).error(function() {
            $scope.loaded = false;
            $scope.requestFailed = true;
        });
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
    $scope.loaded = false;
    $scope.requestFailed = false;
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
        $scope.loaded = false;
        $scope.requestFailed = false;
		newsclipsAPI.noBatch(authInfo.token).success(function(res){
            $scope.gridNewsclips.data = res;
            $scope.loaded = true;
            $scope.requestFailed = false;
        }).error(function() {
            $scope.loaded = false;
            $scope.requestFailed = true;
        });
	};
	$scope.reloadBatchDocs = function(){
        $scope.loaded = false;
        $scope.requestFailed = false;
		batchesAPI.getDocuments(authInfo.token, batch_id).success(function(res){
            $scope.gridNewsclips.data = res;
            $scope.loaded = true;
            $scope.requestFailed = false;
        }).error(function() {
            $scope.loaded = false;
            $scope.requestFailed = true;
        });	
	};
	
	var batch_id = $routeParams.batch_id;
	if(typeof batch_id === 'undefined'){
        $scope.loaded = false;
        $scope.requestFailed = false;
		newsclipsAPI.getAll(authInfo.token).success(function(res){
            $scope.gridNewsclips.data = res;
            $scope.loaded = true;
            $scope.requestFailed = false;
        }).error(function() {
            $scope.loaded = false;
            $scope.requestFailed = true;
        });
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
        if ($scope.processing_action) return;
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
    $scope.loaded = false;
    $scope.requestFailed = false;
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
        $scope.loaded = false;
        $scope.requestFailed = false;
		newsclipsAPI.noCode(authInfo.token, $routeParams.batch_id).success(function(res){
            $scope.gridOptions.data = res;
            $scope.loaded = true;
            $scope.requestFailed = false;
        }).error(function() {
            $scope.loaded = false;
            $scope.requestFailed = true;
        });	
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
        if (processing) return;
        
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
newsclips.controller('newsclipsCreateCtrl', ['$scope', '$routeParams', '$q', '$location', 'authInfo', 'newsclipsAPI', 'newspapersAPI', function($scope, $routeParams, $q, $location, authInfo, newsclipsAPI, newspapersAPI){
	$scope.dt = new Date();
    $scope.processing = false;
	$scope.filters = [
		{ name: 'Executive', value: 0 },
		{ name: 'Leg', value: 0 },
		{ name: 'Jud', value: 0 },
		{ name: 'Sta_Ag', value: 0 },
		{ name: 'Fed', value: 0 },
		{ name: 'Local_Govt', value: 0 },
		{ name: 'Elec', value: 0 },
		{ name: 'Elderly', value: 0 },
		{ name: 'Tax', value: 0 },
		{ name: 'Budget', value: 0 },
		{ name: 'Int_Group', value: 0 },
		{ name: 'TypeID', value: 0 }
	];
    
    $scope.today = function(){
        $scope.dt = new Date();
    };
    $scope.clear = function(){
        $scope.dt = null;
    };
	
	// call tablesAPI to get table names.
    newspapersAPI.getAll(authInfo.token).success(function(res){
		$scope.newspapers = res;
    });
	$scope.create = function(){
		$scope.processing = true;
		var newsclipObj = {
			Headline: $scope.Headline,
			Abstract: $scope.Abstract,
			Newspaper: $scope.Newspaper,
			Date: $scope.dt.getFullYear() + '-' + $scope.dt.getMonth() + '-' + $scope.dt.getDate(),
			Executive: $scope.convertBoolToInt($scope.filters[0].value),
			Leg: $scope.convertBoolToInt($scope.filters[1].value),
			Jud: $scope.convertBoolToInt($scope.filters[2].value),
			Sta_Ag: $scope.convertBoolToInt($scope.filters[3].value),
			Fed: $scope.convertBoolToInt($scope.filters[4].value),
			Local_Govt: $scope.convertBoolToInt($scope.filters[5].value),
			Elec: $scope.convertBoolToInt($scope.filters[6].value),
			Elderly: $scope.convertBoolToInt($scope.filters[7].value),
			Tax: $scope.convertBoolToInt($scope.filters[8].value),
			Budget: $scope.convertBoolToInt($scope.filters[9].value),
			Int_Group: $scope.convertBoolToInt($scope.filters[10].value),
			TypeID: $scope.convertBoolToInt($scope.filters[11].value)
		};
		
		console.log(newsclipObj.Date);
		newsclipsAPI.create(authInfo.token, newsclipObj).success(function(res){
			$scope.processing = false;
			$location.path('/documents/newsclips');
		});
	};
	
	$scope.convertBoolToInt = function(num){
		return (num)?1:0;
	}
}]);