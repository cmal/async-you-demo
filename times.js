var http = require('http')
, async = require('async');


var hostname = process.argv[2];
var port = process.argv[3];

async.series({
    post: function(done) {
        var createUser = function(id, next) {
            var postData = JSON.stringify({"user_id": id});
            var opts = {
                hostname: hostname,
                port: port,
                path: '/users/create',
                method: 'POST',
                headers: {
                    'Content-Length': postData.length
                }
            };
            var req = http.request(opts, function(res) {
                res.on('data', function(chunk) {});
                res.on('end', function() {
                    next();
                });
            });
            req.on('error', function(err) {
                next(err);
            });

            req.write(postData);
            req.end();
        };
        async.times(5, function(n, next) {
            createUser(n+1, function(err) {
                next(err);
            });
        }, function next(err) {
            if (err) return done(err);
            done(null, 'saved');
        });
    },
    get: function(done) {
        http.get('http://' + hostname + ':' + port + '/users', function(res) {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk.toString();
            });
            res.on('end', function() {
                done(null, body);
            });
        }).on('error', done);
    }
}, function(err, results) {
    console.log(results.get);
});
