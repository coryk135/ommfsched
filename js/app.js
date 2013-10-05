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

	/*
    .when("/shots/:id", {controller:"ShotsCtrl", 		templateUrl: "partials/shot.html"})
    .when("/:list", 	{controller:"ShotsListCtrl", 	templateUrl: "partials/shots_list.html"})
    */



/**
 * Creates an unordered list of events in a human-readable form
 *
 * @param {json} root is the root JSON-formatted content from GData
 * @param {string} divId is the div in which the events are added
 */ 
function listEvents(root, divId) {
  var feed = root.feed;
  var events = document.getElementById(divId);

  if (events.childNodes.length > 0) {
    events.removeChild(events.childNodes[0]);
  }	  

  // create a new unordered list
  var ul = document.createElement('ul');

  // loop through each event in the feed
  for (var i = 0; i < feed.entry.length; i++) {
    var entry = feed.entry[i];
    var title = entry.title.$t;
    var start = entry['gd$when'][0].startTime;

    // get the URL to link to the event
    for (var linki = 0; linki < entry['link'].length; linki++) {
      if (entry['link'][linki]['type'] == 'text/html' &&
          entry['link'][linki]['rel'] == 'alternate') {
        var entryLinkHref = entry['link'][linki]['href'];
      }
    }

    var dateString = formatGCalTime(start);
    var li = document.createElement('li');

    // if we have a link to the event, create an 'a' element
    if (typeof entryLinkHref != 'undefined') {
      entryLink = document.createElement('a');
      entryLink.setAttribute('href', entryLinkHref);
      entryLink.appendChild(document.createTextNode(title));
      li.appendChild(entryLink);
      li.appendChild(document.createTextNode(' - ' + dateString));
    } else {
      li.appendChild(document.createTextNode(title + ' - ' + dateString));
    }	    

    // append the list item onto the unordered list
    ul.appendChild(li);
  }
  events.appendChild(ul);
}

/**
 * Callback function for the GData json-in-script call
 * Inserts the supplied list of events into a div of a pre-defined name
 * 
 * @param {json} root is the JSON-formatted content from GData
 */ 
function insertAgenda(root) {
  listEvents(root, 'agenda');
}
