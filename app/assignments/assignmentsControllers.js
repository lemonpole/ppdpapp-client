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
            { name: 'View', cellTemplate: 'app/assignments/partials/cellTemplate_assignments.html' }
        ]
    };
    
    assignmentsAPI.getAll(authInfo.token).success(function(res){
        $scope.gridAssignments.data = res;
    });
    
    $scope.gridAssignmentsScope = {
        loadBatch: function(batchObj){
            // redirect to batch viewer page.
			tablesAPI.find(authInfo.token, batchObj.tablesID).success(function(res){
            	$location.path('/assignments/' + batchObj.batchID + '/view/' + res.TableName);
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