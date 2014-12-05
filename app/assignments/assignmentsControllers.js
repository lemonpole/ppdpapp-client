var acct = angular.module('assignmentsControllers', ['assignmentsFactory', 'ui.grid.selection']);

acct.controller('assignmentsCtrl', ['$scope', '$location', 'assignmentsAPI', 'tablesAPI', 'authInfo', function($scope, $location, assignmentsAPI, tablesAPI, authInfo){
    // http://ui-grid.info/docs/#/tutorial/205_row_editable
    // http://ui-grid.info/docs/#/tutorial/215_paging
    $scope.gridAssignments = {
        enableSorting: true,
        enableRowSelection: true,
        multiSelect: true,
        columnDefs: [
            { name: 'Created By', field: 'creator' },
            { name: 'Date Added', field: 'dateAdded' },
            { name: 'Date Due', field: 'dateDue' },
            { name: 'View', cellTemplate: '<button class="btn btn-default btn-xs" ng-click="getExternalScopes().loadBatch(row.entity)">View</button>' }
        ]
    };
    
    assignmentsAPI.getAll(authInfo.token).success(function(res){
        $scope.gridAssignments.data = res;
    });
    
    $scope.gridAssignmentsScope = {
        loadBatch: function(batchObj){
            // redirect to batch viewer page.
            //$location.path('/batches/' + batchObj.batchID + '/view/' + );
			tablesAPI.find(authInfo.token, batchObj.tablesID).success(function(res){
            	$location.path('/batches/' + batchObj.batchID + '/view/' + res.TableName);
            });
        }
    };
    
    $scope.gridAssignments.onRegisterApi = function(gridApi){
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope,function(row){
            console.log(row.entity.batchID);
        });
    };
}]);

acct.controller('assignmentsViewCtrl', ['$scope', '$routeParams', 'assignmentsAPI', 'authInfo', function($scope, $routeParams, assignmentsAPI, authInfo){
   $scope.gridOptions = {
        enableSorting: true,
        columnDefs: [
            { field: 'Headline' },
            { field: 'Abstract' },
            { name: 'Newsclip Date', field: 'Date' }
        ]
    };
    
    assignmentsAPI.getDocuments(authInfo.token, $routeParams.batch_id).success(function(res){
        $scope.gridOptions.data = res; 
    });
}]);