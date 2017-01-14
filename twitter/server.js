var Twit = require('twit'),
    credentials = require('./Credentials.js'),
    express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);
    //bot = require('./public/js/twitBot.js');

server.listen(process.env.PORT || 8080);

app.use(express.static(__dirname + '/public'));

io.sockets.on('connect', function(socket) {
    socket.on('start tweets', function() {
        var T = new Twit(credentials);

        var stream = T.stream('statuses/filter', {'track':'google'});

        stream.on('tweet', function (tweet) {
            //console.log(tweet);
            if(tweet.coordinates) {
                if (tweet.coordinates != null) {
                    console.log('tweet: ', tweet.text);
                    var locationObj = {
                        "lat": tweet.coordinates.coordinates[0],
                        "lng": tweet.coordinates.coordinates[1],
                        "text": tweet.text
                    }
                    socket.broadcast.emit('twitter-stream', locationObj);
                    socket.emit('twitter-stream', locationObj);
                }
            }
            else if(tweet.user) {
                if (tweet.user.locations != null) {
                    console.log('tweet with close location', tweet.locations);
                }
            }
            else if(tweet.place) {
                console.log('got the place');
            }
        });
        console.log('connected')
        socket.emit('connected');
    });
});



  









