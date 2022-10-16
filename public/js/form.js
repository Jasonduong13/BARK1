

var street_address = document.getElementById('address-input').value,
    city = document.getElementById('city-input').value,
    country = document.getElementById('country-input').value,
    postcode = document.getElementById('postcode-input').value;

var address = street_address + ' ' + city + ' ' + country + ', ' + postcode;


function check_status(json) {
if (json["status"] == "OK") return true;
return false;
}

var latitude;
var longitude;

function AlertLatLng() {
    var street_address = document.getElementById('address-input').value;
    var street_address2 = street_address.split(' ').join('+');

    var city = document.getElementById('city-input').value;
    var city2 = city.split(' ').join('+');

    var state = document.getElementById('state-input').value;
    var state2 = state.split(' ').join('+');

    var postcode = document.getElementById('postcode-input').value;

    var address = street_address2 + ",+" + city2 + ",+" + state2;
    let url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyA5CebZl0-ynyMHrgE8T2Ohr_TqtHq_Gpo";

    jQuery.getJSON(url, function (json) {
      console.log("ran")
      if (!check_status(json)) // If the json file's status is not ok, then return
        return 0;
      latitude = json["results"][0]["geometry"]["location"]["lat"];
      longitude = json["results"][0]["geometry"]["location"]["lng"];

      var result = "The latitude is " +latitude + " and longitude is " + longitude;
      document.getElementById('result').innerHTML=result;

    });       

   
}





