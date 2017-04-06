var http = require('http')
, async = require('async')
, fs = require('fs');

fn = process.argv[2];

async.waterfall([
    function(cb) {
        fs.readFile(fn, function(err, data) {
            var body = data.toString();
            // console.log(body);
            cb(null, body);
        });
    },
    function(data, cb) {
        url = data;
        var body = '';
        http.get(url, function(res) {
            res.on('data', function(chunk){
                body += chunk.toString();
            });
            res.on('end', function(){
                cb(null, body);
            });
        });
    }
], function(err, result) {
    if (err) return console.error(err);
    console.log(result);
});
