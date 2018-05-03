var APP_ID = '64C4EEC8-0A77-5DF5-FF21-DB553F691B00';
var API_KEY = '46B10982-6C8E-374A-FF3A-ADB43E4C2100';

Backendless.serverURL = 'https://api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);
var contactStorage = Backendless.Data.of("Locations");
var queryBuilder = Backendless.DataQueryBuilder.create();
var array = [];
queryBuilder.setRelated(["lattitude", "longitude"]);
var pageSize = 50;

for (var i = 0; i < 50; i++) {
    queryBuilder.setPageSize(pageSize);
    queryBuilder.setOffset(pageSize * i);
    contactStorage.find(queryBuilder).then(function(data) {
        data.forEach(function(item, ii, arr) {
            var times = JSON.parse(item.time);
            var lattitudes = JSON.parse(item.lattitude);
            var longitudes = JSON.parse(item.longitude);
            var altitudes = JSON.parse(item.altitude);
            var speeds = JSON.parse(item.speed);
            for (var j = 0; j < times.length; j++) {
                if (lattitudes[j] > 52 && lattitudes[j] < 58)
                    array.push([lattitudes[j], longitudes[j]]);
            }

            if (i > 48) ymaps.ready(init);

        });
    });


}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//await sleep(2000);





function init() {
    // Создаем карту.
    var myMap = new ymaps.Map("map", {
        center: [55.72, 37.44],
        zoom: 10
    }, {
        searchControlProvider: 'yandex#search'
    });

    // Создаем ломаную с помощью вспомогательного класса Polyline.
    var myPolyline = new ymaps.Polyline(array, { balloonContent: "Ломаная линия:" + array.length }, {
        // Задаем опции геообъекта.
        // Отключаем кнопку закрытия балуна.
        balloonCloseButton: false,
        // Цвет линии.
        strokeColor: "#000000",
        // Ширина линии.
        strokeWidth: 2,
        // Коэффициент прозрачности.
        strokeOpacity: 0.5
    });

    // Добавляем линии на карту.
    myMap.geoObjects.add(myPolyline);
}