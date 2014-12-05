var filters = angular.module('ppdpappFilters', []);

filters.filter('emptyString', function(){
    return function(input, replacer){
        if(input.length <= 0) return replacer;
        else return input;
    }
});

filters.filter('isUndefined', function(){
    return function(prop, replacer){
        if(typeof prop === 'undefined') return replacer;
        else return prop;
    }
});