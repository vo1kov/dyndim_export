var APP_ID = '64C4EEC8-0A77-5DF5-FF21-DB553F691B00';
var API_KEY = '46B10982-6C8E-374A-FF3A-ADB43E4C2100';

Backendless.serverURL = 'https://api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);

/*Backendless.Data.of( "TestTable" ).save( { foo:"bar" } )
    .then( function( obj ) {
        document.write( "object saved. objectId " + obj.objectId )
    } )
    .catch( function( error ) {
        document.write( "got error - " + error )
    })
*/

var contactStorage = Backendless.Data.of( "Locations" );
var queryBuilder = Backendless.DataQueryBuilder.create();
 
// request related objects for the columns
queryBuilder.setRelated( [ "lattitude", "longitude" ] );
 
// set offset and page size
queryBuilder.setPageSize( 99 );
queryBuilder.setOffset( 0 );
 
contactStorage.find( queryBuilder )
 .then( function( data ) {

	data.forEach(function(item, i, arr) {
  		document.write( item.name + ": " + item.lattitude + item.longitude );
	});

  });
                    