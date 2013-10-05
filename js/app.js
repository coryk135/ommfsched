'use strict';

var app = angular.module('ommfsched', [
    'ommfsched.controllers',
    'ommfsched.filters',
    'ommfsched.services',
]);

app.config(function($routeProvider){
    $routeProvider
    	
    .when("/schedule", 	{controller:"ScheduleCtrl", 	  templateUrl: "partials/schedule.html"})
    .when("/map", 	   	{controller:"MapCtrl", 			    templateUrl: "partials/map.html"})
    .when("/info", 		  {controller:"InfoCtrl", 		    templateUrl: "partials/info.html"})
    .when("/makers",   	{controller:"MakersCtrl", 	   	templateUrl: "partials/makers.html"})
    .when("/makers/:id",{controller:"MakerDetailsCtrl", templateUrl: "partials/makerDetail.html"})

    .otherwise({redirectTo: "/schedule"})
});
