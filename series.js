var http = require('http')
, async = require('async');

url1 = process.argv[2];
url2 = process.argv[3];

async.series({
    requestOne: function(done){
        var body = '';
        http.get(url1, function(res) {
            res.on('data', function(chunk) {
                body += chunk.toString();
            });
            res.on('end', function(){
                done(null, body);
            });

        })
    },
    requestTwo: function(done){
        var body = '';
        http.get(url2, function(res) {
            res.on('data', function(chunk) {
                body += chunk.toString();
            });
            res.on('end', function() {
                done(null, body);
            })
        })
    }
}, function(err, results){
    console.log(results);
});
