var http = require('http')
, async = require('async');

async.each(process.argv.slice(2), function(item, done){
    var req = http.get(item, function(res){
        var body = '';
        res.on('data', function(chunk){
            body += chunk.toString();
        });
        res.on('end', function(){
            return done();
        });
    });
    req.write(item);
    req.end();
}, function(err){
    if (err) console.log(err);
});
