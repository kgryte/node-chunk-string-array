'use strict';

// MODULES //

var test = require( 'tape' );
var chunk = require( './../lib' );


// TESTS //

test( 'main export is a function', function test( t ) {
	t.ok( typeof chunk === 'function', 'main export is a function' );
	t.end();
});

test( 'if provided a first argument which is not a string array, the function will throw a type error', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		null,
		undefined,
		NaN,
		true,
		[],
		{},
		function(){},
		['5',null],
		['5',5,'5']
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[ i ] ), TypeError, 'throws an error when provided ' + values[ i ] );
	}
	t.end();
	function badValue( value ) {
		return function badValue() {
			chunk( value, 10 );
		};
	}
});

test( 'if provided a second argument which is not a positive integer, the function will throw a type error', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		-5,
		Math.PI,
		null,
		undefined,
		NaN,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[ i ] ), TypeError, 'throws an error when provided ' + values[ i ] );
	}
	t.end();
	function badValue( value ) {
		return function badValue() {
			chunk( ['beep','boop'], value );
		};
	}
});

test( 'if provided an options argument which is not an object, the function will throw a type error', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		null,
		undefined,
		NaN,
		true,
		[],
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[ i ] ), TypeError, 'throws an error when provided ' + values[ i ] );
	}
	t.end();
	function badValue( value ) {
		return function badValue() {
			chunk( ['beep','boop'], 10, value );
		};
	}
});

test( 'if provided a `strict` option which is not a boolean primitive, the function will throw a type error', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		null,
		undefined,
		NaN,
		{},
		[],
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[ i ] ), TypeError, 'throws an error when provided ' + values[ i ] );
	}
	t.end();
	function badValue( value ) {
		return function badValue() {
			chunk( ['beep','boop'], 10, {
				'strict': value
			});
		};
	}
});

test( 'if `strict` is true, the function will throw an error if a string array contains strings which exceed the `length` parameter', function test( t ) {
	t.throws( foo, Error, 'throws an error' );
	t.end();
	function foo() {
		chunk( ['beep','beboop','bap'], 4, {
			'strict': true
		});
	}
});

test( 'the function chunks a string array into subarrays', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		'beep',
		'bop',
		'bow-wow',
		'bap',
		'boop',
		'bip'
	];
	actual = chunk( arr, 7 );

	expected = [
		['beep','bop'],
		['bow-wow'],
		['bap','boop'],
		['bip']
	];
	t.deepEqual( actual, expected, 'deep equal' );
	t.end();
});

test( 'case: all elements exceed specified length', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		'beep',
		'bop',
		'bow-wow',
		'bap',
		'boop',
		'bip'
	];
	actual = chunk( arr, 3 );

	expected = [
		['beep'],
		['bop'],
		['bow-wow'],
		['bap'],
		['boop'],
		['bip']
	];
	t.deepEqual( actual, expected, 'deep equal' );
	t.end();
});

test( 'case: first element exceeds length', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		'beep',
		'bop',
		'bow',
		'bap',
		'bep',
		'bip'
	];
	actual = chunk( arr, 4 );

	expected = [
		['beep'],
		['bop'],
		['bow'],
		['bap'],
		['bep'],
		['bip']
	];
	t.deepEqual( actual, expected, 'deep equal' );
	t.end();
});

test( 'case: last element exceeds length', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		'bip',
		'bop',
		'bow',
		'bap',
		'bep',
		'beep'
	];
	actual = chunk( arr, 3 );

	expected = [
		['bip'],
		['bop'],
		['bow'],
		['bap'],
		['bep'],
		['beep']
	];
	t.deepEqual( actual, expected, 'deep equal' );
	t.end();
});

test( 'case: elements are length factors', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		'bep',
		'bop',
		'bow',
		'bap',
		'bep',
		'bip',
		'bup'
	];
	actual = chunk( arr, 6 );

	expected = [
		['bep','bop'],
		['bow','bap'],
		['bep','bip'],
		['bup']
	];
	t.deepEqual( actual, expected, 'deep equal' );
	t.end();
});

test( 'case: left over', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		'bep',
		'bop',
		'bow',
		'bap',
		'bep',
		'bip',
		'bup'
	];
	actual = chunk( arr, 12 );

	expected = [
		['bep','bop','bow','bap'],
		['bep','bip','bup']
	];
	t.deepEqual( actual, expected, 'deep equal' );
	t.end();
});

test( 'case: length exceeds combined length', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		'bep',
		'bop',
		'bow',
		'bap',
		'bep',
		'bip',
		'bup'
	];
	actual = chunk( arr, 999999999 );

	expected = [['bep','bop','bow','bap','bep','bip','bup']];
	t.deepEqual( actual, expected, 'deep equal' );
	t.end();
});

test( 'array elements are split atomically', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		'a',
		'bc',
		'def',
		'ghij',
		'lmnop'
	];
	actual = chunk( arr, 5 );

	expected = [
		['a','bc'],
		['def'],
		['ghij'],
		['lmnop']
	];
	t.deepEqual( actual, expected, 'deep equal' );
	t.end();
});

test( 'length is an inclusive boundary', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		'a',
		'bc',
		'def',
		'ghij',
		'lmnop'
	];
	actual = chunk( arr, 6 );

	expected = [
		['a','bc','def'],
		['ghij'],
		['lmnop']
	];
	t.deepEqual( actual, expected, 'deep equal' );
	t.end();
});


