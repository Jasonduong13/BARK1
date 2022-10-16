var locations = [
    ['Cat_call_1', 37.8638966521624, -122.25743564415112, 1],
    ['Cat_call_2', 37.86652233792536, -122.25881966400979, 2],
    ['Cat_call_3', 47.09399, 15.40548, 3],

];

var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: new google.maps.LatLng(37.8638966521624, -122.25743564415112),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

var infowindow = new google.maps.InfoWindow();

var marker, i;

for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
    map: map
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
    }
    })(marker, i));
}
