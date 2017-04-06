var http = require('http')
, async = require('async');

async.map(process.argv.slice(2), function(item, done){
    var body = '';
    var req = http.get(item, function(res){
        res.on('data', function(chunk){
            body += chunk.toString();
        });
        res.on('end', function(){
            return done(null, body);
        });
    })
        .on('error', function(err){
        // done(err);
        });
    req.write(item);
    req.end();
}, function(err, results){
    if (err) return console.log(err);
    console.log(results);
});
