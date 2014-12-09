var files = angular.module('filesControllers', ['filesFactory']);

files.controller('filesCtrl', ['$scope', '$location', 'filesAPI', 'authInfo', function($scope, $location, filesAPI, authInfo){
    $scope.gridOptions = {
        enableSorting: true,
        enableRowSelection: true,
        enableSelectAll: true,
        multiSelect: true,
        columnDefs: [
            { name: 'ID', field: 'fileID' },
            { name: 'Creator', field: 'creator' },
            { name: 'dateAdded', field: 'dateAdded' },
            { name: 'View', cellTemplate: 'app/files/partials/cellTemplate_files.html' }
        ]
    };
    $scope.loaded = false;
    $scope.requestFailed = false;
    
    $scope.reloadFiles = function(){
		filesAPI.getAll(authInfo.token).success(function(res){
			$scope.gridOptions.data = res;
			$scope.loaded = true;
			$scope.requestFailed = false;
		}).error(function() {
			$scope.loaded = false;
			$scope.requestFailed = true;
		});
	};
	$scope.reloadFiles();
	
	$scope.gridScope = {
        viewUsers: function(fileObj){
			// get the batch_id this file belongs to. load that bitch up.
			filesAPI.findBatch(authInfo.token, fileObj.fileID).success(function(res){
				$location.path('/batches/' + res.BatchID + '/view/users');
			});
        }
    };
}]);
files.controller('fileCreateCtrl', ['$scope', '$location', '$upload', 'filesAPI', 'tablesAPI', 'batchesAPI', 'authInfo', function($scope, $location, $upload, filesAPI, tablesAPI, batchesAPI, authInfo){
	$scope.dt = new Date();
    $scope.minDate = new Date();
    $scope.processing = false;
    $scope.batch_type_dd_status = false;
    $scope.batch_type = null;
    
    $scope.today = function(){
        $scope.dt = new Date();
    };
    $scope.clear = function(){
        $scope.dt = null;
    };
    
    // call tablesAPI to get table names.
    tablesAPI.getAll(authInfo.token).success(function(res){
        $scope.batch_type_dd_items = res;
    });
    $scope.setBatchType = function(tableObj){
        $scope.batch_type = tableObj;
    };
	
	$scope.onFileSelect = function($files){
		$scope.processing = true;
		var file = $files[0];
		var fileObj = {
			name: $scope.name,
			dateAdded: new Date(),
			creator: authInfo.email
		};
		var batchObj = {
			name: $scope.name,
			dateDue: $scope.dt,
			dateAdded: new Date(),
			tablesID: $scope.batch_type.ID,
			creator: authInfo.email
		};
		
		filesAPI.create(authInfo.token, fileObj).success(function(file_obj){
			batchObj.fileID = file_obj.fileID;
			batchesAPI.create(authInfo.token, batchObj).success(function(res){
				$scope.processing = false;
				$location.path('/files');
			});
		});
		
		
		// actual file upload pointing to whatever server.
		/*filesAPI.upload(authInfo.token, file).progress(function(evt){
			$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
		}).success(function(data, status, headers, config){
			//append fileObj.url from result.
			
			filesAPI.create(authInfo.token, fileObj).success(function(file_obj){
				batchObj.fileID = file_obj.fileID;
				batchesAPI.create(authInfo.token, batchObj).success(function(res){
					$scope.processing = false;
					console.log('do_work');
				});
			});
		});*/
	};
}]);