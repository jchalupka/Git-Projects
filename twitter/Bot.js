var Twit = require('twit');
var credentials = require('./Credentials.js');
var GoogleMapsAPI = require('googlemaps')

var publicConfig = {
    key: 'AIzaSyB1bcmmlc3AgsAcewctEJdIr6Bd1bTK2wo'
}

var gmAPI = new GoogleMapsAPI(publicConfig);
console.log(gmAPI)
var T = new Twit(credentials);

var stream = T.stream('statuses/filter', {'locations':'-180,-90,180,90'});

stream.on('tweet', function (tweet) {
    if(tweet.coordinates) {
        if (tweet.coordinates != null) {
            var locationObj = {
                "lat": tweet.coordinates.coordinates[0],
                "lng": tweet.coordinates.coordinates[1]
            }
            console.log(locationObj)

            var tweetLocation = new gmAPI.maps.LatLng(locationObj.lat, locationObj.lng);
            console.log(tweetLocation);
        }
    }
});




  









