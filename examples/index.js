'use strict';

var mnames = require( 'datasets-male-first-names-en' );
var fnames = require( 'datasets-female-first-names-en' );
var shuffle = require( 'compute-shuffle' );
var chunk = require( './../lib' );

// Create random groups of people under the constraint that the sum of all first names of people within a group cannot exceed 40 characters...
var maxLength = 40;
var names = mnames.concat( fnames );
shuffle( names );
var groups = chunk( names, maxLength );

for ( var i = 0; i < groups.length; i++ ) {
	console.log( groups[ i ].join( ',' ) );
}

