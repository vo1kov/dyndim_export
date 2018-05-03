var APP_ID = '64C4EEC8-0A77-5DF5-FF21-DB553F691B00';
var API_KEY = '46B10982-6C8E-374A-FF3A-ADB43E4C2100';

Backendless.serverURL = 'https://api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);
var contactStorage = Backendless.Data.of("Locations");
var queryBuilder = Backendless.DataQueryBuilder.create();

// request related objects for the columns
queryBuilder.setRelated(["lattitude", "longitude"]);
var pageSize = 50;

for (var i = 0; i < 50; i++) {
    queryBuilder.setPageSize(pageSize);
    queryBuilder.setOffset(pageSize * i);
    contactStorage.find(queryBuilder).then(function(data) {
        data.forEach(function(item, i, arr) {
            var times = JSON.parse(item.time);
            var lattitudes = JSON.parse(item.lattitude);
            var longitudes = JSON.parse(item.longitude);
            var altitudes = JSON.parse(item.altitude);
            var speeds = JSON.parse(item.speed);
            for (var j = 0; j < times.length; j++) {
                document.write(item.name + " " + times[j] + " " + lattitudes[j] + " " + longitudes[j] + " " + altitudes[j] + " " + speeds[j] + " <br />");            }
        });
    });
}