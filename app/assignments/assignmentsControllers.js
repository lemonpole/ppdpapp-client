var acct = angular.module('assignmentsControllers', ['assignmentsFactory']);

acct.controller('assignmentsCtrl', ['$scope', 'assignmentsAPI', 'authInfo', function($scope, assignmentsAPI, authInfo){
    // http://ui-grid.info/docs/#/tutorial/205_row_editable
    // http://ui-grid.info/docs/#/tutorial/215_paging
    $scope.gridAssignments = {
        enableSorting: true,
        columnDefs: [
            { name: 'Created By', field:'creator' },
            { name: 'Date Added', field:'dateAdded' },
            { name: 'Date Due', field:'dateDue' },
        ]
    };
    
    assignmentsAPI.getAll(authInfo.token).success(function(res){
        $scope.gridAssignments.data = res;
        
    });
}]);