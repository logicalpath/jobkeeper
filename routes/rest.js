
/*
 *  REST Library
 *  Implemented: get for JSON 
 *
 *  TODO: Handle other formats than JSON
 */

var http = require('http');
var https = require('https');

exports.getREST = function(options, callback) {

	var protcl = options.port == 443 ? https: http;
	var req = protcl.request(options, function(res) {
		var output = '';
		res.setEncoding('utf8');

                res.on('data', function (chunk) {
	           output += chunk;
		});
         
	        res.on('end', function() {
		   var obj = JSON.parse(output);
	           callback(res.statusCode, obj);
		});
	});
    
        req.on('error', function(err) {
	        console.log("Error: ",  err.message);
	});

        req.end();
};

