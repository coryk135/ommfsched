'use strict';

var filters = angular.module('ommfsched.filters', []);

filters.filter('ommfschedDate', function($filter){
    return function (value, format) {
        if(value) {
            value = Date.parse(value)
        }
        return $filter('date')(value, format)
    }
});
