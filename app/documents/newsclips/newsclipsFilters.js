var filters = angular.module('newsclipsFilters', []);

filters.filter('batchAction', function(){
    return function(input){
        switch(input){
			case 'view':
				return 'Delete from';
				break;
			case 'add':
				return 'Add to';
				break;
		}
    }
});